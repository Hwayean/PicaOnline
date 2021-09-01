<template>
  <v-app>
    <div class="c-box rds _list" :style="{ marginBottom: (W<500 && W>=400?400:W>=500?500:W)/375*12 +'px'}">
      <div class="img-box" :style="{ 'height': clientWidth*(34/75) + 'px' }">
        <img :style="{ 'height': clientWidth*(34/75) + 'px' }" v-lazy="goods.firstPic" :key="goods.firstPic"  alt="">
        <div v-if="state!=4">
          <p class="goodStateTip goodStateTipDJS" v-if="state==4.5">
            <img class="fs12" style="width:.14rem;height:.14rem;margin-right:.01rem;display:inline-block;" src="../assets/biao.png" alt="">
            <i class="ing-end-time fs10">{{ time.h }}</i>
            <b>:</b>
            <i class="ing-end-time fs10">{{ time.m }}</i>
            <b>:</b>
            <i class="ing-end-time fs10">{{ time.s }}</i>
          </p>
          <span class="goodStateTip goodStateTipOther" v-else>{{ nowState }}</span>
        </div>
      </div>
      <div class="text-box">
        <p class="fs14 num2" style="margin-bottom:.1rem;" v-html="goods.title"></p>
        <div class="ai" style="padding:.03rem 0;">
          <ul class="tips clear fs8" style="padding:0;margin-bottom:.05rem;" v-if="goods.originalPrice>0.9 &&goods.rebate && state !=5 && state != 6">
            <li class="left fan red fs10 hongbao" style="padding:.01rem .05rem;">返<i class="fs10">￥</i><span class="n">{{ goods.rebate }}</span></li>
          </ul>
        </div>

        <div class="ai" style="padding:.03rem 0;">
          <div class="fs11 old-price hui">原价<i class="fs10">￥</i><span class="n">{{ formatNum(goods.originalPrice || 0) }}</span></div>
        </div>

        <div class="clear price-box ai">
          <span class="left fs12 red now-price">￥<i class="fs16 bold"><span class="n">{{ formatNum( goods.sellingPrice || 0) }}</span></i></span>
          <span class="right fs12 volume hui">已售<span>{{ goods.salesVolume > 0 ? goods.salesVolume : 0 }}</span></span>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "cardList2",
  data(){
    return {
      W: document.body.clientWidth || document.documentElement.clientWidth,
      nowState:'',
      state:'',
      // 倒计时
      time:{
        h: '00',
        m: '00',
        s: '00'
      },
    }
  },
  props:['goods']
}
</script>

<style scoped>

</style>
