<template>
    <div>
        我是歌手tab
        
    </div>
</template>

<script>
import  { getSingerOrigin } from '../api/singer.js'
import personHeader from '../components/singer/singerItem.vue'
export default {
    components:{
personHeader
    },
    data(){
        return  {
               singerList:{},

        }
    },
    mounted() {
        this.getSingerList();
    },
    methods: {
        getSingerList(){
            getSingerOrigin().then(res=>{
                console.log(res,'歌手列表');
                this.convenceData(res.data.list)

            })
        },
        convenceData(list){
        let mapRelation= {
            hot:{}
        };
        mapRelation.hot.items =[];
        mapRelation.hot.title='热门';
        for(let i=0;i<list.length;i++){
          if(i<10){
            let obj = {
            id:list[i].Fsinger_id,
            name:list[i].Fsinger_name
           }
          mapRelation.hot.items.push(obj);
       }
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
                 id:mapitem.Fsinger_id,
                 name:mapitem.Fsinger_name
             }
         })
            
     
     }
        console.log(mapRelation,'mapRelation');
        }
    },
}
</script>

<style>

</style>
