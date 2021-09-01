<template>
  <v-app>
    <div id="player"></div>
    <router-view></router-view>
  </v-app>

</template>


<script>
//import APlayer from "aplayer"

export default {


  name: 'App',

  components: {},

  data: () => ({
    info: []
  }),

  mounted() {

    document.title = "Pica Online";
    let token;
    token = localStorage.getItem("token")
    if (token === null) {
      this.$router.push("/login")
    }else
    {
      this.$router.push("/home")
    }
    // eslint-disable-next-line no-unused-vars
    // const ap = new APlayer({
    //   container: document.getElementById('p1layer'),
    //   autoplay:true,
    //   fixed: true,
    //   //float:true,
    //   audio: [{
    //     name: 'name',
    //     artist: 'artist',
    //     url: 'http://localhost/music.mp3',
    //     lrc: 'http://localhost/music.lrc',
    //     cover: 'cover.jpg'
    //   }]
    //
    // });


  },
  methods: {
    req() {


    }
  }
};
</script>
