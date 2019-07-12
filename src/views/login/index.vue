<template>
    <div class="login-router">
        <el-card class="center">
            <img src="../../assets/images/logo_index.png" alt="" class="loginimg">
            <el-form ref="rulesLogin" :model="form" style="margin-top:20px" :rules="rules">
                <el-form-item prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item class="login-verify" style="margin-bottom: 10px" prop="verify">
                    <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
                </el-form-item >
                <el-button type="primary" plain style=" float: right">点击发送验证</el-button>
                <el-form-item class="checked" prop="check">
                <el-checkbox :value=true>我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>

                <el-button type="primary" class="btn" @click="verifyLogin()">主要按钮</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('输入正确的手机号'))
      }
    }
    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    verifyLogin () {
      this.$refs.rulesLogin.validate(valid => {
        if (valid) {
          this.axios
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.form)
            .then(res => {
              console.log(res)
              console.log(111)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号错误')
            }
            )
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
    .login-router{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
        .center{
            width: 420px;
            height: 300px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .loginimg{
                height:50px;
                display: block;
                margin: 0 auto;
            }
        }
    }
    .login-verify{
        display:inline-block;
        width:210px;
        padding-right: 30px;
    }
    .btn{
        display:inline;
        width:100%;

    }
    .checked{
         margin-bottom: 0;
    }
</style>
