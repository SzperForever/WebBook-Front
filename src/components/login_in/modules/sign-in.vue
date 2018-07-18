<template>
  <div>
    <div class="ui small modal">
      <i class="close icon"></i>
      <div id="message" class="header">

      </div>
    </div>

    <div class="black-back">
      <div class="hint">
        <p style="font-size: x-large">Welcome</p>
        Log into System by using your NTID
      </div>

      <div class="login-card">
        <div class="card-content">
          <p class="login-title">Login</p>
          <form class="ui form">
            <div class="field">
              <label></label>
              <input v-model="form.username" class="login-input" type="text" name="username"
                     placeholder="username">
              <input v-model="form.password" class="login-input" type="password" name="password"
                     placeholder="password">
            </div>
            <button class="ui red button" v-on:click.prevent="login">Log in</button>
            <button class="ui red button" v-on:click.prevent="showRegister">Register Now</button>
          </form>
        </div>
      </div>

      <div class="register-card">
        <div class="card-content">
          <p class="login-title">Register</p>
          <form class="ui form">
            <div class="field">
              <label></label>
              <input v-model="form.username" class="login-input" type="text" name="username"
                     placeholder="username">
              <input v-model="form.password" class="login-input" type="password" name="password"
                     placeholder="password">
              <input v-model="form.passwordConfirm" class="login-input" type="password" name="password-confirm"
                     placeholder="password" v-on:input="checkPassword">
              <div class="password-hint">

              </div>
              <input v-model="form.email" class="login-input" type="email" name="password-confirm"
                     placeholder="email">
            </div>
            <button id="register-button" class="ui red button" v-on:click.prevent="register">Register</button>
          </form>
        </div>
      </div>


    </div>
  </div>
</template>

<script>

  export default {
    name: "sign-in",
    data() {
      return {
        form: {
          username: null,
          password: null,
          passwordConfirm: null
        },
        isLogin: []
      }
    },
    methods: {
      login() {
        console.log("登陆", this.form.username, this.form.password);

        console.log("Lock Time : ", this.$util.get("lock"));

        this.$util.post('loginAuth', this.form, (data) => {
          if (data.state == "fail") {
            this.$Message.error(data.reason);

            if (data.reason == "Password doesn't match") {
              let result = this.$util.addFailTimes();
              console.log(result);
              if (result) {
                this.$util.post("lockUser", {username: this.form.username}, () => {
                  this.$Message.error("尝试登陆次数太多，账户已被锁定，请联系管理员解锁账户");
                  this.$util.clearLockTimes()
                })
              }
            }

          }
          else {
            this.$util.setUser(this.form.username, data.reason);
            window.location.href = "#/index";
          }
        });
      },
      showRegister() {
        $('.login-card').addClass('login-card-animation-disappear');
        setTimeout(function () {
          $('.login-card').css('display', 'none');
        }, 800);
        $('.register-card').addClass('register-card-show');
      },
      checkPassword() {
        if (this.form.password !== this.form.passwordConfirm) {
          $('.password-hint').text('doesn\'t match');
          $('#register-button').addClass('disabled');
        }
        else {
          $('.password-hint').text('');
          $('#register-button').removeClass('disabled');
        }
      },
      register() {
        if (this.form.username == '' || this.form.username == null) {
          this.$Message.warning('用户名不能为空');
          return;
        }

        if (this.form.email == '' || this.form.email == null) {
          this.$Message.warning('邮箱不能为空');
          return;
        }

        var userData = {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email
        };

        this.$util.post('registerAuth', userData, (data) => {
          if (data.code == 0) { //fail
            this.$Message.error(data.msg);
          }
          else {
            this.$Message.success(data.msg);
            location.reload();
          }
        });

      }
    }
  }
</script>

<style scoped>
  .black-back {
    position: absolute;
    top: 33vh;
    width: 48%;
    height: 300px;
    margin-left: 29%;
    border-radius: 4px;
    background: rgba(15, 11, 16, 0.71);
  }

  .hint {
    /*display: inline;*/
    position: relative;
    width: 30%;
    margin-left: 7%;
    top: 10vh;
    color: rgba(228, 228, 228, 0.69);
    font-size: small;
  }

  .login-card {
    position: relative;
    top: -80px;
    left: 38%;
    height: 360px;
    width: 52%;
    border-radius: 4px;
    -webkit-box-shadow: 1px -1px 3px 1px rgba(40, 40, 40, 0.42);
    box-shadow: 1px -1px 3px 1px rgba(40, 40, 40, 0.42);
    background: white;

    transition: all 800ms;

  }

  .login-card-animation-disappear {
    transform: rotateY(90deg);
  }

  .register-card {
    position: relative;
    top: -80px;
    left: 38%;
    height: 360px;
    width: 52%;
    border-radius: 4px;
    -webkit-box-shadow: 1px -1px 3px 1px rgba(40, 40, 40, 0.42);
    box-shadow: 1px -1px 3px 1px rgba(40, 40, 40, 0.42);
    background: white;

    display: none;
    transform: rotateY(90deg);
  }

  .register-card .card-content {
    transform: translateY(3vh);
  }

  .register-card-show {
    display: block;
    animation: register-card-show 800ms;
    animation-delay: 800ms;
    animation-fill-mode: forwards;
  }

  @keyframes register-card-show {
    0% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  .card-content {
    width: 75%;
    margin: 0 auto;
    transform: translateY(8vh);
  }

  .login-title {
    color: rgba(249, 134, 109, 1);
    font-size: x-large;
    padding-bottom: 28px;
  }

  .login-input {
    width: 98%;
    border: 0;
    border-bottom: 1px solid rgba(50, 50, 50, 0.74);
    outline: none;
  }

</style>
