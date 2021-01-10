<template>
    <div class="heade" v-if="person.name" @click="selectItem(person)">
      <img :src="getAvator" alt=""> <span class="name">{{person.name}}</span>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props:{
        person:{
            default:{},
            type:Object
        }
    },
    computed: {
        getAvator(){
            return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.person.id}.jpg?max_age=2592000`
        }
    },
    methods: {
        selectItem(person){
            // this.$EventBus.$emit('selectItem',person);
            this.$router.push(`/singerdetail/${person.id}`);
            this.setSinger(person);
            // this.$store.commit('SET_SINGER',person)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        })
    },
}
</script>

<style scoped>
.heade{
    padding: 5px 10px;
    width:100%;
    height:48px;
    line-height: 48px;
    
}
img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    display: inline-block
}
</style>
