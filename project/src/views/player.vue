<template>
    <div class="player">
        <!-- 播放器组件 -->
        <transition name="normal"  @enter="enter">

        <div class="normal " v-show="fullscreen">
            <div class="playerheader"><span class=" icon iconfont icon-arrow-down" @click='taggleScreen'></span><span style="flex:1">{{songCurrent.name}}</span></div>
            <div class="center"><img :src="songCurrent.image" alt=""  :class="playCircle"></div>
           <!-- 进度条 -->
            <div class="progress">
                <span> {{currentTime | getSeconds}}</span> <div class="progressP"><progressBar :progress='progress' :current='currentTime' @percentProgress='percentProgress'></progressBar></div> <span>{{songCurrent.duration | getSeconds}}</span>
            </div>
            <div class="foot">
                <span class='icon iconfont icon-conditions'></span>
                 <span class='icon iconfont icon-arrow-left' @click="pre"></span>
                  <span :class='playingState' @click="togglePlayer"></span>
                   <span class='icon iconfont icon-arrow-right' @click="next"></span>
                    <span class='icon iconfont icon-favorites-fill'></span> </div>

        </div>
       
    </transition>
        <div class="fold"  v-show="!fullscreen">
           <span  class="imgtitle"><img :src="songCurrent.image" @click="taggleScreen"></span> <span  style="font-size:15px">{{songCurrent.name}}</span> <span  class='icon iconfont icon-play-fill1'></span><span class='icon iconfont icon-favorites-fill'></span>
        </div>
     <audio src="https://gi-sycdn.kuwo.cn/43753fe60b0d0806de3a56cc0a0f669f/5ffb0265/resource/n3/47/28/1068763360.mp3" ref="audio" @timeupdate="updateTime"></audio> 
    </div>
</template>
 
<script>
import  {mapGetters,mapMutations}  from 'vuex';
import { getSeconds } from '../common/timer.js'
import progressBar from '../components/singer/progress.vue'
export default {
    data(){
        return {
          currentTime:0,
          

        }
    },
    components:{
     progressBar
    },
    computed:{
        ...mapGetters([
            'fullscreen',
            'playing',
            'songCurrent',// 当前播放歌曲
            'currentIndex',
            'playList'
        ]),
        playingState(){
            return this.playing ? 'icon iconfont icon-suspended':'icon iconfont icon-play-fill1'
        },
        playCircle(){
            return this.playing ? 'play':'play pluse';
        },
        progress(){
            // console.log(this.currentTime,this.songCurrent.duration);
            return  (this.currentTime  / this.songCurrent.duration)*100
        }

    },
 watch:{
   songCurrent(){
      this.$nextTick(()=>{
        this.$refs.audio.play();
      })
   },
   playing(newVal){
     this.$nextTick(()=>{
       newVal ?  this.$refs.audio.play(): this.$refs.audio.pause();
      })
      
   }
    },
    methods:{
    ...mapMutations([
        'SET_FULLSCREEN',
        'SET_PLAYING',
        'SET_CURRENTINDEX'
    ]),
    // 音乐收起展开
      taggleScreen(){
        this.SET_FULLSCREEN(!this.fullscreen);
      },
    //  音乐暂停
    togglePlayer(){
       this.SET_PLAYING(!this.playing);
    },
    // 下一首歌曲
    next(){
        const index = this.currentIndex+1;
        if(index===this.playList.length){
            index=0;
        }
        this.SET_CURRENTINDEX(index);
        if(!this.playing){
            this.togglePlayer();
        }
    },
    pre(){
         const index = this.currentIndex-1;
        if(index==-1){
            index=this.playList.length-1;
        }
        this.SET_CURRENTINDEX(index);
        if(!this.playing){
            this.togglePlayer();
        }
    },
    // 歌曲进度
    updateTime(e){
      this.currentTime=  e.target.currentTime;
    },
    //  进度条事件
    percentProgress(percent){
         this.$refs.audio.currentTime = percent * this.songCurrent.duration ;
         if (!this.playing) {
          this.togglePlayer()
        }
    },
      enter(){

      }
    },

    mounted(){
    //    console.log(this.songCurrent,'songCurrent');
    },
    filters:{
     getSeconds:getSeconds
     }
}

</script>


<style  scoped>
.player{
    z-index:999;
    position: fixed;
    left: 0;
    right: 0;
    /* top: 0; */
    bottom: 0;
    background: #fff;
    padding:20px;
  
}
.center img  {
    border-radius: 50%;
}
.center .play{
    animation:rotate 20s linear infinite;
}
.center .pluse {
     animation-play-state: paused
}
.normal-enter,.normal-leave-to{
       opacity:  0;/*透明度*/
}
 .normal-enter-active,.normal-leave-active{
            transition: all 0.8s ease;
 }
.normal{
    width:100vm;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* background: rgb(32, 32, 32); */
}
.center {
    padding-top:50px;
    flex:1
}
.normal .progress {
     /* height: 60px; */
     width:100vm;
     display:flex;
}
.normal .progress span {
    width:60px;
    height: 100%;
}
.progress .progressP{
        padding-top: 5px;
        border-radius: 5px;
    flex:1
}
.fold {
    width:100vm;
    height: 50px;
    display: flex;
   
      /* background: green; */
}
.fold  span {
     font-size: 30px;
     flex:1
}
/* .fold  span:nth-child(3)  {
     font-size: 30px;
     flex:1
} */
 .fold  .imgtitle{
     width:30px;
     height:30px;
 }
 .fold  .imgtitle img  {
     width: 50px;
     height:50px;
 }
.playerheader {
    padding: 15px;
display: flex;

/* justify-content: space-between */
}
 .icon-arrow-up,.icon-arrow-down
  {
    font-size:30px;
}
.foot {
    display: flex;
}
.foot   span {
    flex:1;
    font-size:35px;
}
@keyframes rotate {
 0%{
 transform: rotate(0)
 }
      
100%{
 transform: rotate(360deg)
    }
     
}
   
</style>
