var express = require('express');
var router = express.Router();
const mysql = require('../plugins/mysql');
const { setToken, getToken } = require('../plugins/token');

/**
 *  @description 用户名密码登录
 *  @param  {string} username  用户名
 *  @param  {string} password  密码
 *  @return {*}
 */

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    var sql = `SELECT id,username,password,date_format(createTime, '%Y-%m-%d %H:%i:%s') AS createTime,date_format(updateTime, '%Y-%m-%d %H:%i:%s') AS updateTime FROM tb_user where username='${username}'`;
    const data = await mysql(sql);
    if (data[0]) {
      if (data[0].password != password) {
        res.json({ code: 301, message: '密码错误' });
        return false;
      }
      var tokenValue = setToken(data[0], 3600 * 24 * 3);
      res.json({ code: 200, message: '登录成功', data: { token: tokenValue } });
    } else {
      res.json({ code: 301, message: '用户不存在' });
    }
  } catch (e) {
    console.log(e);
  }
});

/**
 *  @description 根据手机号获取验证码
 *  @param  {string} phone  手机号
 *  @return {*}
 */

router.post('/code', (req, res) => {
  //这里模拟验证码
  const code = Math.floor(Math.random() * (995425 - 147895 + 1) + 147895);
  res.json({ code: 200, data: code, message: '获取验证码成功' });
});

/**
 *  @description 手机号登录
 *  @param  {string} phone  手机号
 *  @param  {string} code  验证码
 *  @return {*}
 */

router.post('/cellphone', async (req, res) => {
  try {
    const { phone } = req.body;
    var sql = `SELECT id,username,password,date_format(createTime, '%Y-%m-%d %H:%i:%s') AS createTime,date_format(updateTime, '%Y-%m-%d %H:%i:%s') AS updateTime FROM tb_user where phone='${phone}'`;
    var data = await mysql(sql);
    if (!data[0]) {
      const insertSql = `INSERT INTO tb_user(username,password,phone) VALUES(${phone},'123456',${phone});SELECT id,username FROM tb_user where phone='${phone}' into @id,@username;INSERT INTO tb_userinfo(id,username) VALUES(@id,@username)`;
      await mysql(insertSql);
      data = await mysql(sql);
    }
    var tokenValue = setToken(data[0], 3600 * 24 * 3);
    res.json({ code: 200, message: '登录成功', data: { token: tokenValue } });
  } catch (e) {
    console.log(e);
  }
});

/**
 *  @description 获取用户信息
 *  @param  {string} token
 *  @return {*}
 */

router.post('/userInfo', async (req, res) => {
  try {
    const { token } = req.body;
    const temp = await getToken(token);
    var sql = `SELECT * FROM tb_userinfo where id='${temp.id}'`;
    const data = await mysql(sql);
    res.json({ code: 200, message: '获取用户信息成功', data: data[0] });
  } catch (e) {
    console.log(e);
  }
});

/**
 *  @description 退出登录
 *  @return {}
 */

router.post('/logout', (req, res) => {
  res.json({ code: 200, message: '退出成功' });
});

/**
 *  @description 修改用户信息
 *  @return {*}
 */

router.post('/editInfo', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const temp = await getToken(token);
    const { username, position, location, label, skill } = req.body;
    var sql = `update tb_userinfo set username='${username}',position='${position}',location='${location}',label='${label}',skill='${skill}' where id='${temp.id}';update tb_user set username='${username}' where id='${temp.id}'`;
    await mysql(sql);
    res.json({ code: 200, message: '修改成功' });
  } catch (e) {
    console.log(e);
  }
});

/**
 *  @description 修改用户密码等
 *  @return {*}
 */

router.post('/edit', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const temp = await getToken(token);
    const { password } = req.body;
    var sql = `update tb_user set password='${password}' where id='${temp.id}'`;
    await mysql(sql);
    res.json({ code: 200, message: '修改成功' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
