<template>
    <!-- header组件 -->
    <div class="header">
      <img src="../../assets/header.png" alt=""> <span class="headetitle">Chicken Music</span>
    </div>
</template>

<script>
export default {
    name:'headerNav'
}
</script>

<style>
.header  {
    height:44px;
    width:100%;
    margin: 0 auto;
  
}
  .header img  {
      height: 100%;
     display: inline-block;

    }
    .header .headetitle {
        color:gold;
        font-size:20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif

    }
</style>


