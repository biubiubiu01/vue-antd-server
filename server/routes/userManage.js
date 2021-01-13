var express = require('express');
var router = express.Router();
const mysql = require('../plugins/mysql');
const nodeExcel = require('excel-export');

/**
 *  @description 获取用户信息表  分页
 *  @return {Array}
 */

router.post('/userTable', async (req, res) => {
  try {
    const { role, username, startTime, endTime, page, size } = req.body;
    let sql =
      "SELECT id,username,password,phone,date_format(createTime, '%Y-%m-%d %H:%i:%s') AS createTime,role,text,flag from tb_user where 1=1";
    let totalSql = 'select count(*) as total from tb_user where 1=1';
    let str = ' and flag=1 ';
    if (role) {
      str += ` and role ='${role}'`;
    }
    if (username) {
      str += ` and username like '%${username}%'`;
    }
    if (startTime && endTime) {
      str += ` and createTime >='${startTime}' and createTime <='${endTime}'`;
    }

    sql += str;
    totalSql += str;

    sql += ` order by createTime desc limit ${(parseInt(page) - 1) * parseInt(size)},${parseInt(size)}`;
    const data = await mysql(sql);
    const total = await mysql(totalSql);
    res.json({
      code: 200,
      message: 'table表获取成功',
      data: {
        record: data,
        total: total[0].total
      }
    });
  } catch (e) {
    console.log(e);
  }
});

/**
 *  @description 添加用户
 *  @param {...userFrom}
 *  @return {*}
 */

router.post('/addUser', async (req, res) => {
  try {
    const { role, username, password, phone, text } = req.body;
    let sql = `INSERT INTO tb_user(username,password,phone,role,text,flag) VALUES('${username}','${password}','${phone}','${role}','${text}',1)`;
    await mysql(sql);
    res.json({
      code: 200,
      message: '添加成功'
    });
  } catch (e) {
    console.log(e);
    res.json({
      code: -1,
      message: '添加失败'
    });
  }
});

/**
 *  @description 修改用户信息
 *  @param {...userFrom}
 *  @return {*}
 */

router.post('/editUser', async (req, res) => {
  try {
    const { role, username, password, phone, text, id } = req.body;
    let sql = `update tb_user set role='${role}',username='${username}',password='${password}',phone='${phone}',text='${text}' where id='${id}'`;
    await mysql(sql);
    res.json({
      code: 200,
      message: '修改成功'
    });
  } catch (e) {
    console.log(e);
    res.json({
      code: -1,
      message: '修改失败'
    });
  }
});

/**
 *  @description 删除
 *  @param {...userFrom}
 *  @return {*}
 */

router.post('/deleteTable', async (req, res) => {
  try {
    const { id } = req.body;
    let ids = id.split(',');
    let sql = `update tb_user set flag=0  where `;
    ids.forEach(item => {
      sql += 'id=' + item + ' OR ';
    });

    await mysql(sql.slice(0, -3));
    res.json({
      code: 200,
      message: '删除成功'
    });
  } catch (e) {
    console.log(e);
    res.json({
      code: -1,
      message: '删除失败'
    });
  }
});

module.exports = router;
