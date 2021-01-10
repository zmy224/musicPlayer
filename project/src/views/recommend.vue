<template>
    <div class='swiperT'>
        <swiper :swipeList='swipeList'></swiper>
        <h5 style="color:gold">热门歌单推荐</h5>
    </div>
</template>

<script>
import swiper from  '../components/home/swipe.vue'
import { getSlideData } from '../api/recommend.js'
export default {
  components:{
      swiper
     },
  data(){
      return  {
           swipeList:[], //  轮播图数据
      }
  },
    mounted() {
        //  初始化获取轮播图数据
        getSlideData().then(res=>{
            console.log(res)
            if(res.code==0){
             this.swipeList = res.data.slider;
            }
           
        })
          
    },
}
</script>

<style scoped>
.swiperT {
    position: absolute;
   top: 80px;
    width: 100%;
}
</style>
