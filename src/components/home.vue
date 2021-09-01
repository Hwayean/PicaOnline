<template>
  <v-app>

    <v-main>
      <div id="back">
        <br>
        <span style="display:block;user-select: none;font-size:50px;text-align: center;font-family:微软雅黑;color: #7d7d7d">Pica Search</span><br>

        <v-text-field
            class="mx-auto"
            style="width: 800px;"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            filled
            rounded
            solo
            v-model="searchText"
            v-on:click:prepend-inner="search"
            @keydown.enter="search"
        ></v-text-field>

        <br><br><br>
        <div id="result" style="margin: auto" v-if="total!==0">
          <h3 style="text-align:left;padding-left: 5em">共{{ total }}个结果：</h3><br>

          <v-row justify="center">
            <v-col v-for="(item,i) in searchRes" :key="i" cols="auto">
              <v-hover
                  v-slot="{ hover }"
              >
                <v-card
                    :elevation="hover ? 5 : 1"
                    class="mx-auto"
                    color="#F3FF3C6"
                    max-width="200"
                    min-width="200"
                    style="height: 350px;border-top-left-radius: 10px;border-top-right-radius: 10px"

                >
                  <v-img lazy-src="../assets/pica.jpg" :src="item.thumb.fileServer+'/static/'+item.thumb.path"
                         :width="200"
                         :height="hover?150:250">

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
                  <span class="cardtext">{{ item.title }}</span>
                  <span v-if="hover" class="cardtext">作者：{{ item.author }}</span>

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
import board from "@/components/board";

export default {

  name: "home",
  components: {},

  data() {
    return {

      searchRes: [],
      pages: 1,
      page: 1,
      total: 0,
      searchText: "",
    }
  },
  mounted() {

  },
  methods: {
    a() {
      console.log(board.data().drawer ? 12 : 10);
      return board.data().drawer ? 12 : 10
    },

    getData(index) {

      this.$axios.request({
        method: 'get',
        url: 'http://localhost:8000/search',
        params: {
          'keyword': this.searchText,
          'page': index
        },
        headers: {
          'token': localStorage.getItem("token"),
        }
      }).then((res) => {
        this.searchRes = res.data.data.comics.docs
        this.page = index
        this.pages = res.data.data.comics.pages
        this.total = res.data.data.comics.total
      })
    },
    search() {

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
    },

  }
}
</script>

<style scoped>
.background {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: 0;
  position: absolute;
}

#back{
  margin: auto;
  padding-left: 300px;
  padding-right: 300px

}

.cardtext {
  display: block;
  text-overflow: ellipsis;
  text-align: center;
  color: #474747;
  font-family: 微软雅黑, serif;
  font-size: 14px;
  letter-spacing: 2px;

}
</style>
