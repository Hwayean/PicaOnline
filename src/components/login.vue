<template>
  <v-app>

    <div class="background"><img :src="imgSrc" width="100%" height="100%" alt="" style="object-fit: cover"></div>

    <v-main>

      <v-hover id="loginPannel"
               v-slot="{ hover }"
      >
        <v-card
            :elevation="hover ? 12 : 2"
            class="{'on-hover': hover}"
            style="border-radius: 20px"
        >
          <div style="padding: 50px">

            <H1 style="color: #f8afc1" align="center">Pica Comic Online</H1>

            <v-form ref="form" lazy-validation>
              <v-text-field v-model="user.username" label="账号" :rules="nameRule" color="pink"></v-text-field>
              <v-text-field v-model="user.password" label="密码" :rules="psdRule" color="pink"></v-text-field>
              <v-checkbox label="Remember me" v-model="rememberMe" color="#f8afc1"></v-checkbox>

              <v-btn outlined color="pink" block rounded @click="validate">登录
              </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-hover>

    </v-main>

    <v-snackbar
        v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!--    页脚-->
    <template>
      <v-footer padless>
        <v-col
            class="text-center"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Pica Comic Online. All rights reserved</strong>
        </v-col>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data() {
    return {

      rememberMe: false,
      imgSrc: require('../assets/back.jpg'),
      snackbar: false,
      text: "",
      user: {
        username: "",
        password: ""
      },
      loginInfo: {
        message: null,
        data: null,
        code: null,
      },
      nameRule: [v => !!v || '用户名不能为空'],
      psdRule: [v => !!v || '密码不能为空',]
    }
  },
  mounted() {
    let token;
    token = localStorage.getItem("token")
    if (token !== null) {
      this.$router.push("/home")
    }
  },

  methods: {
    validate() {
      var qs = require('qs')
      if (this.$refs.form.validate()) {

        this.$axios.request({
          method: 'POST',
          url: 'http://localhost:8000/authorization/',
          data: qs.stringify({
            username: this.user.username,
            password: this.user.password,
          }),


        }).then(res => {

          this.loginInfo = res.data

          if (this.loginInfo.code !== "400") {
            if (this.rememberMe) {
              localStorage.setItem("token", this.loginInfo.data.token)
            } else {
              sessionStorage.setItem("token", this.loginInfo.data.token)
            }
            this.$router.push("/home")
          } else {
            this.text = "账号或密码错误"
            this.user.username = ""
            this.user.password = ""
            this.snackbar = true
          }
        }).catch(() => {

          this.text = "网络错误"
          this.snackbar = true
        })

      } else {

        this.text = "用户名或密码不能为空"
        this.snackbar = true

      }

    },
  }
}
</script>

<style scoped>
#loginPannel {

  height: 380px;
  width: 420px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -220px 0 0 -200px;

}

.background {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: 0;
  position: absolute;
}

.front {
  z-index: 1;
  position: absolute;
}

</style>
