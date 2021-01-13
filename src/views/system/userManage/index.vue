<template>
  <div class="userManage-wrapper">
    <a-card :hoverable="true" :bordered="false">
      <div slot="title" class="flex flex-wrap">
        <a-button type="primary" icon="plus" class="select-bottom" @click="handleAdd">
          新增用户
        </a-button>
        <a-button
          type="danger"
          icon="delete"
          style="margin:0 16px 10px"
          :loading="deleteLoading"
          @click="handleBatchDelete"
        >
          批量删除
        </a-button>
        <a-select placeholder="用户权限" class="select-width" allowClear @change="changeRole">
          <a-select-option v-for="item in roleOption" :key="item.key" :value="item.key">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <a-input
          placeholder="用户名"
          class="select-width"
          @pressEnter="handleSearch"
          allowClear
          v-model="tableQuery.username"
        />
        <a-range-picker
          class="select-width"
          style="width:210px"
          :placeholder="['开始日期', '结束日期']"
          allowClear
          @change="changeTime"
        />
        <a-button type="primary" icon="search" class="select-bottom" style="margin-right:16px" @click="handleSearch">
          查询
        </a-button>
      </div>
      <standard-table
        :tableData="tableData"
        :tableHead="tableHead"
        :loading="loading"
        @changeCurrent="changeCurrent"
        :pagination="{
          pageSize: tableQuery.size,
          current: tableQuery.page,
          total: total,
          showTotal: total => `共 ${total} 条`
        }"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelect }"
      >
        <div slot="index" slot-scope="{ index }">
          {{ index + 1 }}
        </div>
        <div slot="role" slot-scope="{ text }">
          <a-tag :color="text | statusFilter">
            {{ text }}
          </a-tag>
        </div>
        <div slot="action" slot-scope="{ text }">
          <a-button type="primary" size="small" @click="handleEdit(text)">
            编辑
          </a-button>
          <a-popconfirm title="你确定要删除当前列吗?" ok-text="是" cancel-text="否" @confirm="handleDelete(text)">
            <a-button type="danger" size="small" style="margin-left:8px">
              删除
            </a-button>
          </a-popconfirm>
        </div>
      </standard-table>
    </a-card>
    <user-model
      :roleOption="roleOption"
      :currentRow="currentRow"
      :dialogVisible="dialogVisible"
      @cancel="dialogVisible = false"
      @ok="handleOk"
      v-if="dialogVisible"
    />
  </div>
</template>

<script>
import { getUserTable, deleteTable } from '@/api/userManage';
import userModel from './userModel';
import standardTable from '@/components/standardTable/index';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const tableHead = [
  {
    title: '序号',
    dataIndex: 'index',
    scopedSlots: { customRender: 'index' },
    width: 60
  },
  {
    title: 'id',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '密码',
    dataIndex: 'password'
  },
  {
    title: '权限',
    dataIndex: 'role',
    scopedSlots: { customRender: 'role' }
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    ellipsis: true
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'text',
    ellipsis: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 140
  }
];
export default {
  name: 'userManage',
  components: { standardTable, userModel },
  filters: {
    statusFilter(status) {
      const statusList = {
        admin: '#f50',
        test: '#2db7f5',
        editor: '#87d068'
      };
      return statusList[status];
    }
  },
  data() {
    return {
      roleOption: [
        {
          key: 'admin',
          label: '超级管理员'
        },
        {
          key: 'test',
          label: '普通用户'
        },
        {
          key: 'editor',
          label: '作家'
        }
      ],
      tableQuery: {
        role: null,
        username: '',
        startTime: '',
        endTime: '',
        page: 1,
        size: 10
      },
      total: 0,
      loading: false,
      deleteLoading: false,
      exportLoading: false,
      tableData: [],
      selectedRowKeys: [],
      selectValue: [],
      dialogVisible: false,
      currentRow: null,
      tableHead
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    changeRole(val) {
      this.tableQuery.role = val;
    },
    changeTime(str, time) {
      Object.assign(this.tableQuery, {
        startTime: time[0] ? time[0] + ' 00:00:00' : time[0],
        endTime: time[1] ? time[1] + ' 23:59:59' : time[1]
      });
    },

    handleSelect(key, value) {
      this.selectedRowKeys = key;
      this.selectValue = value;
    },
    //查询
    handleSearch() {
      this.tableQuery.page = 1;
      this.getTableList();
    },
    //删除
    handleDelete(val) {
      deleteTable({ id: val.id }).then(() => {
        this.$message.success('删除成功!');
        this.getTableList();
      });
    },
    //批量删除
    handleBatchDelete() {
      if (this.selectValue.length == 0) {
        this.$message.warning('请至少勾选一项');
        return;
      }
      this.deleteLoading = true;
      const id = this.selectValue.map(item => item.id).join(',');
      deleteTable({ id }).then(() => {
        this.$message.success('删除成功!');
        this.getTableList();
        this.deleteLoading = false;
      });
    },
    //编辑
    handleEdit(row) {
      //这里还需要通过id获取用户对应的菜单，这里就不写了。
      this.currentRow = { ...row };
      this.dialogVisible = true;
    },
    //新增
    handleAdd() {
      this.currentRow = null;
      this.dialogVisible = true;
    },
    handleOk() {
      this.dialogVisible = false;
      this.currentRow = null;
      this.getTableList();
    },

    //切换页面
    changeCurrent(val) {
      this.tableQuery.page = val;
      this.getTableList();
    },

    //获取table数据
    getTableList() {
      this.loading = true;
      getUserTable(this.tableQuery).then(res => {
        const data = res.data || [];
        Object.assign(this, {
          tableData: data.record || [],
          loading: false,
          total: data.total
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.select-width {
  width: 150px;
  margin-right: 16px;
  margin-bottom: 10px;
}
.select-bottom {
  margin-bottom: 10px;
}
</style>
