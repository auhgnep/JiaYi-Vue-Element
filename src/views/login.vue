<template>
  <section>
    <div class="container">
      <div id="scene">
        <div class="layer" data-depth-x="-0.5" data-depth-y="0.25">
          <img src="@/assets/images/moon.png" class="moon" />
        </div>
        <div class="layer" data-depth-x="0.15">
          <img src="@/assets/images/mountains02.png" />
        </div>
        <div class="layer" data-depth-x="0.25">
          <img src="@/assets/images/mountains01.png" />
        </div>
        <div class="layer" data-depth-x="-0.25"><img src="@/assets/images/road.png" /></div>
      </div>
    </div>
    <div class="login" data-depth-x="-0.25">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h2 style="margin-bottom: 1rem;">嘉仪</h2>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaOnOff">
          <div style="display: flex;">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 63%"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img"/>
            </div>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;color: #ffffff">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            class="new-login-btn"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right;" v-if="register">
            <router-link class="link-type" :to="'/register'">立即注册</router-link>
          </div>
        </el-form-item>
      </el-form>
      <!-- <h2>登录</h2>
      <div class="inputBox"><input type="text" placeholder="用户名" /></div>
      <div class="inputBox"><input type="password" placeholder="密码" /></div>
      <div class="inputBox">
        <input type="submit" value="登入" id="btn" />
      </div> -->
      <!-- <div class="group">
        <a href="#">忘记密码</a>
        <a href="#">注册</a>
      </div> -->
    </div>
  </section>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Parallax from 'parallax-js';

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },

  mounted() {
    const scene = document.getElementById("scene");
    const parallax = new Parallax(scene);
  },
  
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/font-poppins.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.container {
  position: absolute;
  left: -10%;
  width: 120%;
  height: 100vh;
  background: url("~@/assets/images/bg.jpg");
}
.container #scene .layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
.container .layer img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.container .layer img.moon {
  background-blend-mode: screen;
}
.login {
  position: relative;
  padding: 60px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
}
.login h2 {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  font-weight: 600;
  color: #fff;
}
.login .inputBox {
  position: relative;
}
.login .inputBox input {
  position: relative;
  width: 100%;
  padding: 15px 20px;
  outline: none;
  font-size: 1.25em;
  color: #fff;
  border-radius: 5px;
  background: #fff;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}
.login .inputBox ::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.login .inputBox #btn {
  position: relative;
  border: none;
  outline: none;
  background: linear-gradient(0deg, #2c3c99, #00b0ff);
  color: #fff;
  cursor: pointer;
  font-size: 1.25em;
  font-weight: 500;
  box-shadow: none;
  transition: 0.5s;
}

.login .group {
  display: flex;
  justify-content: space-between;
}

.login .group a {
  font-size: 1.25em;
  color: #fff;
  text-decoration: none;
}
.login .group a:nth-child(2) {
  text-decoration: underline;
}

::v-deep .el-input.el-input--medium.el-input--prefix>input {
  position: relative;
  width: 100%;
  padding: 15px 20px;
  outline: none;
  font-size: 1.25em;
  color: #fff;
  border-radius: 5px;
  background: #fff;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
  height: 3rem;
  padding-left: 2rem;
}

::v-deep .new-login-btn {
  position: relative;
  border: none;
  outline: none;
  background: linear-gradient(0deg, #2c3c99, #00b0ff);
  color: #fff;
  cursor: pointer;
  font-size: 1.25em;
  font-weight: 500;
  box-shadow: none;
  transition: 0.5s;
  height: 4rem;
}

::v-deep .el-input__prefix {
  left: 10px;
}

::v-deep .svg-icon {
  height: 3.5em;
}

::v-deep .el-form-item__error {
  top: 3.2rem;
}

.login-code-img {
  height: 3rem;
}

</style>
