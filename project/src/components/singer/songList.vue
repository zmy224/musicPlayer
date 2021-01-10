<template>
    <div class="songlist">
    
      <div class="list" v-for="(song,index) in songsList "  :key="index" @click='playCurrentSong(song,index)'>
          <h4> {{song.name}}</h4>
          <div>{{song.singer}}  .  {{song.album}}</div>
      </div>
    </div>
</template>


<script>
import {mapMutations,mapState,mapGetters} from 'vuex';
export default {
    props:{
        // singer:{
        //     type:Object,
        //     default:{}
        // },
        songsList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            imageId:'',
        }
    },
   
    mounted(){
    },
   
    methods:{
        ...mapMutations([
              'SET_PLAYING',
              'SET_FULLSCREEN',
              'SET_SEQUENCELIST',
              'SET_PLAYLIST',
              'SET_MODE',
              'SET_CURRENTINDEX'
        ]),
//   播放当前歌曲      
    playCurrentSong(song,index){
    this.SET_FULLSCREEN(true);
    this.SET_PLAYLIST(this.songsList);
    this.SET_CURRENTINDEX(index);
    this.SET_PLAYING(true);

    }
 }
}
</script>

<style  scoped>
.songlist{
    padding: 15px;
    margin-top: 340px;
    height: calc(100vh - 340px);
    overflow: scroll;
   /* position: fixed;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    color:azure;
    background-color: rgba(0, 0, 0, 0.85);
    padding:15px;
    border:0.5px solid #fff */
}
.list {
    text-align: left
     
}

</style>

