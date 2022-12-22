<template>
  <el-container>
    <el-form :model="form" label-width="70px" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" clearable type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row>
          <el-col :span="14" class="code">
            <el-input v-model="form.code" clearable></el-input>
          </el-col>
          <el-col :span="10">
            <img :src="'http://192.168.10.44:8080/code'+'?key='+key" style="width: auto;height: 40px"
                 @click="key = Math.random()" alt="请勿频繁点击">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button type="success" @click="login">登录</el-button>
        <el-button type="warning" @click="resetForm('form')">重置</el-button>
        <el-button type="primary">注册</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        code: ""
      },
      key: Math.random(),
      rules: {
        username: [{required: true, message: "请输入用户名", trigger: "blur"}],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
        code: [{required: true, message: "请输入验证码", trigger: "blur"}]
      }
    }
  },
  methods: {
    login() {
      // 检查表单是否填写的符合规则
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$request({
            method: "post",
            data: {
              ...this.form,
              key: this.key
            },
            url: "/user/login"
          }).then(res => {
            console.log(res)
          })
        } else {
          return false;
        }
      });
    }, resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  justify-content: center;
  align-items: center;
}

.el-form {
  width: 370px;
}

.el-form-item:last-child /deep/ .el-form-item__content {
  display: flex;
  justify-content: space-around;
}

.el-form {
  padding: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px #ddd;
}

img {
  padding-left: 5px;
}
</style>