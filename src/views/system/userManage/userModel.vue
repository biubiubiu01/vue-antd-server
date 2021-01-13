<template>
  <a-modal
    :title="currentRow ? '编辑' : '新增'"
    :visible="dialogVisible"
    okText="确认"
    cancelText="取消"
    :width="620"
    :confirmLoading="loading"
    @ok="handleSure"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
  >
    <a-form-model
      :model="userFrom"
      :rules="userRule"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      ref="userFrom"
      hideRequiredMark
    >
      <a-form-model-item prop="id" label="id" v-show="currentRow">
        <a-input v-model="userFrom.id" disabled />
      </a-form-model-item>
      <a-form-model-item prop="username" label="用户名" hasFeedback>
        <a-input v-model="userFrom.username" />
      </a-form-model-item>
      <a-form-model-item prop="password" label="密码" hasFeedback>
        <a-input v-model="userFrom.password" />
      </a-form-model-item>
      <a-form-model-item prop="phone" label="手机号" hasFeedback>
        <a-input
          v-model="userFrom.phone"
          placeholder="请输入手机号"
          size="large"
          allow-clear
          :maxLength="11"
          type="text"
        >
          <svg-icon icon="phone" :size="14" slot="prefix"> </svg-icon>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="role" label="权限">
        <a-radio-group v-model="userFrom.role">
          <a-radio v-for="item in roleOption" :key="item.key" :value="item.key">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item prop="text" label="描述">
        <a-textarea v-model="userFrom.text" placeholder="描述..." :autoSize="{ minRows: 3, maxRows: 5 }" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { editTable, addTable } from '@/api/userManage';
import { isPhone } from '@/utils/validate';
const validatePhone = (rule, value, callback) => {
  if (!isPhone(value)) {
    callback(new Error('手机号码有误，请重新填写'));
  } else {
    callback();
  }
};
export default {
  name: 'userModel',
  props: {
    currentRow: [Object, null],
    dialogVisible: Boolean,
    roleOption: Array
  },
  data() {
    return {
      userRule: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空！' }],
        password: [{ required: true, trigger: 'blur', min: 6, message: '密码不能少于6位！' }],
        role: [{ required: true, trigger: 'blur', message: '请选择用户权限！' }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }]
      },
      userFrom: {
        role: ''
      },
      loading: false
    };
  },

  mounted() {
    this.userFrom = { ...this.currentRow } || {
      role: ''
    };
  },
  methods: {
    handleSure() {
      this.$refs.userFrom.validate(valid => {
        this.loading = true;
        if (valid) {
          if (this.currentRow) {
            //编辑
            editTable(this.userFrom)
              .then(() => {
                this.$message.success('修改成功!');
                this.loading = false;
                this.$emit('ok');
              })
              .catch(e => {
                this.loading = false;
              });
          } else {
            //新增
            addTable(this.userFrom)
              .then(res => {
                this.$message.success('添加成功!');
                this.loading = false;
                this.$emit('ok');
              })
              .catch(e => {
                this.loading = false;
              });
          }
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
