<template>
    <div class="singerdetail">
       <div class="header"> <span  @click="goBack"> <  </span> {{singer.name}} </div>
        <div class="bgimg" :style="bgStyle"></div>
       <songList :songsList='songList'></songList>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createSong  } from '../common/song.js'
import songList  from '../components/singer/songList.vue'
import { getSingerDetail  } from '../api/singer.js'
export default {
    data(){
        return  {
        singerId:'',
        songList:[]//  歌曲列表
        }
    },
    computed:{
        ...mapGetters(['singer']),
        bgStyle(){
            return `background-image:url(https://y.gtimg.cn/music/photo_new/T001R800x800M000${this.singerId}.jpg?max_age=2592000)`
        }
    },
    components:{
       songList
    },
    created(){
    this.singerId = this.$route.params.id;
    this.getSingerDetails();
    },
    mounted(){
       
    },
    methods:{
     getSingerDetails(){
            if(!this.singer.id){
            this.$router.push('/');
            }
        getSingerDetail(this.singerId).then(res=>{
            if(res.data.list.length){
            let songList = res.data.list;
            console.log(songList,'songList')
            this.normalizeData(songList);
            }
     })
    },
    //  处理列表数据
    normalizeData(list){
    this.songList=[];
     list.forEach(element => {
    let songItem=  createSong(element.musicData);
    
    this.songList.push(songItem);
     });
     console.log(this.songList,'songList')
    },

    goBack(){
       this.$router.go(-1);
     },

    }
}
</script>

<style scoped>

.singerdetail{
 overflow: scroll;
    box-sizing: border-box;
    width: 100vw;
    /* height: 100vh; */
    color:azure;
    background-color: rgba(0, 0, 0, 0.85);
   
    border:0.5px solid #fff;
} 
.bgimg{
    height: 300px;
    top: 48px;
    background-size: cover;
    width:100%;
    position: absolute;
}
.header {
     padding:15px;
    height: 48px;
    text-align: center;

}
.header  span {
    float: left;
  
}
</style>

