<template>
<!-- 进度条组件 -->
<div class="com">
  <!-- <span>进度展示{{progress}}%</span>  {{current | getSeconds}}-->
  <div slot="footer" class="dialog-footer"  ref="progressBar" @touchend.prevent='touchEnd' @touchstart.prevent='touchStart' @touchmove.prevent='touchMove'  @click="moveToCurrent">
   <span class="progress" ref="progress"></span>
   <span class="circlebtn" ref="circlebtn"></span>
  </div>
</div>
</template>

<script>
import { getSeconds } from '../../common/timer.js'
export default {
//    这里是监听progress变化一旦改变控制进度条的宽度
    watch:{
        progress:function (val) {
            this.$refs['progress'].style.width= val+'%';
             const barWidth =   this.$refs['progress'].clientWidth -2.5;
            this.$refs['circlebtn'].style.left=barWidth + 'px';
    
        }
    },
    props:{
        progress:{
            type:Number,
            default:0
        },
        current:{
            type:Number,
            default:''
        }

    },
    methods:{
        //  touch  事件
        touchStart(e){
          this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth;
        },
        touchMove(e){
       if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 2, Math.max(0, this.touch.left + deltaX))
         this.$refs['progress'].style.width= offsetWidth+'px';
          this.$refs['circlebtn'].style.left=offsetWidth + 'px';
          
        },
        touchEnd(e){
        this.touch.initiated = false;
        this.emitPercent();
        },
        emitPercent(){
        const barWidth  = this.$refs.progressBar.clientWidth;
         const percent =  this.$refs.progress.clientWidth   /  barWidth
         this.$emit('percentProgress',percent);
       },
       //  点击进度条事件
       moveToCurrent(e){
           debugger;
          this.$refs['progress'].style.width= e.offsetX+'px';
          this.$refs['circlebtn'].style.left=e.offsetX + 'px';
          this.emitPercent();
       }

    },
    filters:{
        getSeconds
    },
    created(){

    },
    mounted(){
        this.touch= {}
    }
  
}
</script>

<style lang="css">
 
.com  .progress{
           background-color: green;
           height: 100%;
           display: block;
           color:white;
           width:0px;
           /* border-radius:10px; */
        }
       .circlebtn {
            position: absolute;
            width:5px;
            height: 5px;
            top:0;
            left:0;
            border-radius: 50%;
            background: rgb(209, 35, 35);
         
        }
        .circlebtn:hover {
            width:8px;
            height: 8px;
        }
     .dialog-footer {
        position: relative;
        width:100%;
        height: 5px;
        background: grey}
</style>
