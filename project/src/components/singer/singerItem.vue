<template>
    <div class="heade">
      <img :src="person.id" alt=""> <span>person.name</span>
    </div>
</template>

<script>
export default {
    props:{
        person:{
            default:{},
            type:Object
        }
    }
}
</script>

<style scoped>
.heade{
    width:100%;
    height:48px;
}
</style>
