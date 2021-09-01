<template>
  <v-app>


    <v-main>
      <v-overlay :value="overlay" v-on:click="overlay=!overlay">
        <img ref="picture" :src="imgSrc" style="object-fit: contain" alt=""/>
      </v-overlay>
      <div class="back">

        <div id="result" style="margin: auto" v-if="total!==0">
          <h3 style="text-align:left;padding-left: 5em">共{{ total }}个结果：</h3><br>

          <v-row justify="center">
            <v-col v-for="(item,i) in favourite" :key="i" cols="auto">
              <v-hover
                  v-slot="{ hover }"
              >
                <v-card
                    :elevation="hover ? 5 : 1"
                    class="postercard"

                    color="#F3FF3C6"

                    style=""
                >
                  <v-img class="poster" lazy-src="../assets/pica.jpg"
                         :src="item.thumb.fileServer+'/static/'+item.thumb.path"
                         :width="200"
                         @click="showPicture(item.thumb.fileServer+'/static/'+item.thumb.path)"
                  >

                    <template v-slot:placeholder>
                      <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                      >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <span class="cardtext" style="display: block;text-align: center">{{ item.title }}</span>
                  <span v-if="hover" style="display: block;text-align: center;font-size: 15px"
                        class="cardtext">作者：{{ item.author }}</span>

                  <v-btn style="position:absolute;left:50%;top: 50%;margin: 120px 0 0 0" rounded v-if="hover"
                         outlined
                         color="indigo">LEARN
                  </v-btn>

                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <br><br>
          <template>
            <div>
              <v-pagination
                  v-model="page"
                  :length="pages"
                  circle
                  color="indigo"
                  v-on:input="(number)=>{getData(number)}"
              ></v-pagination>

            </div>
          </template>
        </div>
      </div>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "favourite",
  data() {
    return {
      favourite: [],
      pages: null,
      total: null,
      page: null,
      overlay: false,
      imgSrc: null,
    }
  },
  mounted() {
    this.$axios.request({
      method: 'get',
      url: 'http://localhost:8000/favourite/',
      params: {
        page: '1'
      },
      headers: {token: localStorage.getItem('token')}
    }).then((res) => {
      this.favourite = res.data.data.comics.docs
      this.total = res.data.data.comics.total
      this.pages = res.data.data.comics.pages
      this.page = 1
    })
    console.log(this.favourite)
  },
  methods: {
    computeheight(hover) {
      if (hover)
        document.getElementById('poster').style.height = '150px'
      else
        document.getElementById('poster').style.height = '250px'
    },
    getData(index) {

      this.$axios.request({
        method: 'get',
        url: 'http://localhost:8000/favourite',
        params: {
          page: index
        },
        headers: {token: localStorage.getItem('token')}
      }).then((res) => {
        this.favourite = res.data.data.comics.docs
        this.total = res.data.data.comics.total
        this.pages = res.data.data.comics.pages
        this.page = index
      })
    },

    showPicture(path) {
      this.overlay = true
      this.imgSrc = path
    }
  }
}
</script>

<style scoped>
.back {
  margin: auto;
  padding-left: 300px;
  padding-right: 300px
}

.postercard .poster {
  height: 250px;
  transition: height 100ms;
  -moz-transition: height 100ms; /* Firefox 4 */
  -webkit-transition: height 100ms; /* Safari and Chrome */
  -o-transition: height 100ms; /* Opera */
}

.postercard:hover .poster {
  height: 150px;
}

.postercard {
  height: 350px;
  width: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

</style>
