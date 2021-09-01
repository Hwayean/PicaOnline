<template>
  <v-app>


    <v-navigation-drawer
        app
        hide-overlay
        clipped
        v-model="drawer"
        style="display: none"
    >
      <br>
      <span class="timeText"> {{ dateDay }}</span>
      <br>

      <v-divider></v-divider>

      <v-list rounded>

        <v-list-item-group
            v-model="tab"
            color="primary"
        >
          <v-list-item
              to="/home"

          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>首页</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
              to="/categories"
          >
            <v-list-item-icon>
              <v-icon>mdi-animation</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>分类</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
              to="/favourite"
          >
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>收藏</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
              to="/popular"
          >
            <v-list-item-icon>
              <v-icon>mdi-fire</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>热门</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar
        ref="navbar"
        id="navbar"
        app
        src="../assets/back1.jpg"
        dark
        elevation="6"
        clipped-left
        color="#6A76AB"

    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,1), rgba(25,32,72,0.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon v-on:click="drawer=!drawer"></v-app-bar-nav-icon>
      <span
          style="-webkit-user-select: none;user-select: none;letter-spacing: 1px;font-size: 20px;margin-left: 20px;font-family: 微软雅黑">
        <nobr><strong>Pica Online</strong></nobr>
      </span>


      <v-tabs style="margin-left: 20px">
        <v-tab to="/home">首页</v-tab>
        <v-tab to="/categories">分类</v-tab>
        <v-tab to="/popular">热门</v-tab>
        <v-tab to="/favourite">我的收藏</v-tab>
      </v-tabs>


      <v-text-field
          class="searchBox"
          flat

          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          v-model="searchText"
          v-on:click:prepend-inner="jump"
          v-on:keydown:enter="jump"
          v-on:input="textInput"
          v-if="this.$router.currentRoute.path!=='/home'"
      >
      </v-text-field>

      <div id="board_avatar">
        <v-menu
            bottom
            min-width="200px"
            rounded
            offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
                icon
                x-large
                v-on="on"

            >
              <v-avatar size="40">
                <img class="avatarimg" src="../assets/pica.jpg" alt="John">
              </v-avatar>

            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <!--                头像-->
                <v-avatar size="40">
                  <img src="../assets/pica.jpg" alt="picauser">
                </v-avatar>
                <br>
                <h3>{{ user.name }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>

                <p class="text-caption mt-1">
                  等级：{{ user.level }}
                </p>

                <v-divider class="my-3"></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                >
                  详细信息
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    v-on:click="logout"
                >
                  退出登录
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>

    </v-app-bar>

    <template>
      <v-parallax src="../assets/back1.jpg" height="300" style="object-fit: contain"></v-parallax>
    </template>


    <v-main>
      <router-view></router-view>
      <br><br>
    </v-main>

    <v-footer
        padless
        elevation="1"
    >

      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Pica Comic Online.</strong>
        <v-btn icon>
          <v-icon size="24px" color="blue">
            mdi-twitter
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon size="24px" color="black">
            mdi-github
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon size="24px" color="red">
            mdi-youtube
          </v-icon>
        </v-btn>


      </v-col>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      drawer: false,
      token: null,
      searchText: "",
      imgSrc: "../assets/back.jpg",
      //个人信息
      user: {
        gender: null,
        name: null,
        email: null,
        title: null,
        level: null,
        exp: null,
      },
      tab: null,
      searchRes: [],
      //时间相关
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      timer: null,

      //判断是否正在输入
      isTyping: false,
      intervalId: null,


    }
  },

  mounted() {

    let token
    token = localStorage.getItem("token")

    if (token === null) {
      token = sessionStorage.getItem('token')
      if (token === null) {
        this.$router.push("/login")
      }
    }
    this.token = token

    this.timer = setInterval(() => {
      const date = this.$dayjs(new Date())
      this.dateDay = date.format('HH:mm:ss');
      this.dateYear = date.format('YYYY-MM-DD');
      this.dateWeek = date.format(this.weekday[date.day()]);

    }, 1000)


    //获取个人信息
    this.$axios.request({
      method: 'get',
      url: 'http://localhost:8000/personInfo/',
      headers: {token: localStorage.getItem('token')},

    }).then((res) => {
      this.user = res.data.data.user
    }).catch((e) => {
      console.log(e)
    })


    document.getElementById('navbar').style.setProperty('left', '80px')
    document.getElementById('navbar').style.setProperty('right', '80px')

    const html = document.querySelector('html');
    window.onscroll = function () {
      let st = html.scrollTop

      if (st >= 0) {
        if (st <= 140) {


          document.getElementById('navbar').style.setProperty('left', (140 - st) / 140 * 80 + 'px')
          document.getElementById('navbar').style.setProperty('right', (140 - st) / 140 * 80 + 'px')
          document.getElementById('navbar').style.setProperty('top', (140 - st) + 'px')

        } else {
          document.getElementById('navbar').style.setProperty('top', '0')
          document.getElementById('navbar').style.setProperty('left', '0')
          document.getElementById('navbar').style.setProperty('right', '0')
        }
      }
    }
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {


    jump() {
      this.$router.push("/home")
    },
    textInput() {

      if (this.isTyping === false) {
        this.intervalId = self.setInterval(this.search, 200)
        this.isTyping = true
      } else {
        self.clearInterval(this.intervalId)
        this.intervalId = self.setInterval(this.search, 200)

      }
    },
    search() {

      self.clearInterval(this.intervalId)
      this.isTyping = false
      if (this.searchText !== "") {

        this.$axios.request({
          method: 'get',
          url: 'http://localhost:8000/search',
          params: {
            'keyword': this.searchText,
            'page': '1'
          },
          headers: {
            'token': localStorage.getItem("token"),
          }
        }).then((res) => {
          this.searchRes = res.data.data.comics.docs
          this.pages = res.data.data.comics.pages
          this.total = res.data.data.comics.total
          this.page = 1
        })


      } else {
        this.searchRes = []
      }


    },
    logout() {
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      this.$router.push("/login")
    },
    changeTab(index) {
      if (index === 1) {
        this.$router.push("/categories")
      } else if (index === 2) {
        this.$router.push("/popular")
      } else if (index === 3) {
        this.$router.push("/favourite")
      } else if (index === 4) {
        this.$router.push("/home")
      }
    }
  }
}
</script>

<style scoped>
#board_avatar {


}

.background {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: 0;
  position: absolute;

}

.timeText {
  display: block;
  text-align: center;
  color: #7d7d7d;
  font-family: 微软雅黑, serif;
  font-size: 22px;
  letter-spacing: 2px;
  -webkit-user-select: none;
  user-select: none;
}

#navbar {
  position: fixed;
  top: 140px;
  height: 200px;
  left: 80px;
  right: 80px;
  margin: 0;
}

.searchBox {
  width: 300px;
  margin-top: 10px;

  margin-right: 20px;
  -moz-transition: width 100ms; /* Firefox 4 */
  -webkit-transition: width 100ms; /* Safari and Chrome */
  -o-transition: width 100ms; /* Opera */
}


.searchBox:hover {
  width: 500px;
}
</style>
