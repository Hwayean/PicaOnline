<template>
  <v-app>

    <v-main>

      <div class="back">
        <v-container v-if="loading">
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-skeleton-loader
                  v-bind="attrs"
                  type="card-avatar, article, actions"
              ></v-skeleton-loader>

              <v-skeleton-loader
                  v-bind="attrs"
                  type="date-picker"
              ></v-skeleton-loader>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-skeleton-loader
                  v-bind="attrs"
                  type="article, actions"
              ></v-skeleton-loader>

              <v-skeleton-loader
                  v-bind="attrs"
                  type="table-heading, list-item-two-line, image, table-tfoot"
              ></v-skeleton-loader>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-skeleton-loader
                  v-bind="attrs"
                  type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
              ></v-skeleton-loader>

              <v-skeleton-loader
                  v-bind="attrs"
                  type="list-item-avatar-three-line, image, article"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>
        <template>
          <v-expansion-panels>
            <v-expansion-panel
                v-for="(item,i) in categories"
                :key="i"
            >
              <div v-if="item.active!==true">
                <v-expansion-panel-header>
                  {{ item.title }}
                </v-expansion-panel-header>

                <v-expansion-panel-content>

                  <v-img :src="item.thumb.fileServer+'/static/'+item.thumb.path" v-on:click="alert(13)"></v-img>
                </v-expansion-panel-content>
              </div>

            </v-expansion-panel>
          </v-expansion-panels>

        </template>
      </div>


    </v-main>

  </v-app>

</template>

<script>
export default {
  name: "categories",

  data() {
    return {
      loading: true,
      imgSrc: require('../assets/back.jpg'),
      categories: [],
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 1
      },
    }
  },
  mounted() {


    this.$axios.get("http://localhost:8000/categories/", {headers: {'token': localStorage.getItem("token")}}).then((res) => {
      this.categories = res.data.data.categories
      this.loading = false
    }).catch((err) => {
      console.log(err);
    })

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

.back {
  margin: auto;
  padding-left: 300px;
  padding-right: 300px
}
</style>
