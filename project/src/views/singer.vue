<template>
    <div class="scrollcontent">
        <div v-for="(item,index) in singerList" :key="index">
               <div class="title" :class="item.title">{{item.title}}</div>
               <personHeader v-for="(sub,index) in  item.items" :key='index' :person='sub'> </personHeader>
        </div>
           <div class="rightList" > <div v-for="(item,index) in singerList" :key="index" @click="scrollToTitle(item,index)" :class="{'activeColor':currentClickIndex==index}" >{{item.title}}</div></div>
    </div>
</template>

<script>
import  { getSingerOrigin } from '../api/singer.js'
import personHeader from '../components/singer/singerItem.vue'
const fixedTopHeight= 80; //  顶部固定高度
export default {
    components:{
personHeader
    },
    data(){
        return  {
               singerList:{},
               currentClickIndex:0, //默认高亮的tab
               tag:[],
               positionsObj:[]

        }
    },
   async created() {
       await   this.getSingerList();
     
    },
    mounted() {
        const _this = this;
        let scrollContent  =  document.querySelector('.scrollcontent');
        //   监听滚动事件
    scrollContent.addEventListener('scroll',()=>{
     _this.positionsObj.forEach((item,index)=>{
          if(parseInt(_this.positionsObj[index])<(scrollContent.scrollTop +43)&& parseInt(_this.positionsObj[index+1])>scrollContent.scrollTop){
              _this.currentClickIndex =  index;
              return 
          }
      })

    })

   
    },
    beforeDestroy() {
         this.$EventBus.$off('selectItem')
    },
    methods: {
        getSingerList(){
            getSingerOrigin().then(res=>{
               if(res.code==0){
                 this.singerList= {...this.convenceData(res.data.list)}
  
               }
        
            }).catch(()=>{}).finally(()=>{
              this. getEveryTagPosition()
            })
        },
        //获取每个tag的位置
          getEveryTagPosition(){
        this.tag.forEach(clickItem=>{
            //  获取每个元素的offsetTop
     let   clickEl=document.getElementsByClassName(`${clickItem}`)[0];
     //  距离父元素顶部的距离offsetTop
     let  offsetTop = clickEl.offsetTop - fixedTopHeight

     this.positionsObj.push(offsetTop)
   
        })
      },
        convenceData(list){
        let mapRelation= {
            // hot:{}
        };
        for(let i=0;i<list.length;i++){
         let findex=list[i].Findex;  
         mapRelation[findex]={
             title:'',
             items:[]
         }
        }    
     for(let key in mapRelation){
         mapRelation[key].title=key;
         mapRelation[key].items=list.filter(item=>item.Findex==key).map(mapitem=>{
          return  {
                 id:mapitem.Fsinger_mid,
                 name:mapitem.Fsinger_name
             }
         })   
     }
      let sorts= Object.keys(mapRelation).sort(function(a,b){
return a.charCodeAt(0)- b.charCodeAt(0);
})
     this.tag = sorts;
      let singerList  =[];
      sorts.forEach(item=>{
          singerList.push(mapRelation[item]);
      })
      return singerList
        },
        //  让页面滚动到点击元素的位置  
        scrollToTitle(item,index){
            this.currentClickIndex= index;
     let clickItem  =  item.title; //  点击元素
     let   clickEl=document.getElementsByClassName(`${clickItem}`)[0];
     //  距离父元素顶部的距离offsetTop
     let  offsetTop = clickEl.offsetTop - fixedTopHeight
     this.$nextTick(function () {
                document.querySelector('.scrollcontent').scrollTo({"behavior":"smooth","top":offsetTop});
            })
        
         
        }
    },

}
</script>

<style scoped>
.scrollcontent {
    margin-top: 80px;
    padding: 0 35px;
    height: 100%;
    overflow: scroll;
    text-align: left;  
    color:rgb(138, 135, 135);
}
.rightList {
    position: fixed;
    right: 0;
        top: 92px;
}
.activeColor {
    color:orange;
}

</style>
