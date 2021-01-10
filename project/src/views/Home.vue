<template>
  <div class="home"> 
   <!-- 顶部 -->
   <header-nav></header-nav>
   <!-- tab -->
   <ul class="tab">
     <li @click='tabTaggle("recommend")'>推荐</li>
     <li @click='tabTaggle("hh")'>人气</li>
     <li @click='tabTaggle("singer")'>歌手</li>
     <li @click='tabTaggle("music")'>音乐</li>
   </ul>
   <!-- 动态组件 -->
   <component :is="currentTab"></component>

  </div>
</template>

<script>
import headerNav from '../components/home/header.vue'
import recommend from  './recommend.vue'
import singer from  './singer.vue'

export default {
 components:{
   headerNav,
   recommend,
   singer
 },
 data(){
   return  {
     currentTab:'recommend'
   }
 },
 methods: {
   tabTaggle(taggleMenu){
     this.currentTab=taggleMenu;
   }
 },
}
</script>

<style>
.home{
  /* overflow:hidden;  */
  border:0.5px solid #eee;
  background-color: #272727;
  margin: 0;
  height: 100%;
  width:100%;
  position: relative;
}
.tab,.header{
  position: fixed
}
v::deep .header {
  top:0
}
.tab{
  top:40px;

}
.home ul {
  width: 100%;
  list-style: none;
  display: flex;
 margin:10px 0;
 padding:0;

}
.home ul li  {
   list-style: none;
   flex:1;
   color:rgb(138, 135, 135);
}
.home ul li:active{
  color:gold;
}
</style>
