<template>
    <li class="cell" :class="num == index ?'dora':''">
    {{item.name}}
  
  </li>
</template>
<script>
export default {
     props: {
      item: {
        type: Object
      },
      index: {
        type: Number
      },
      num: {
        type: Number
      }
    },
}
</script>
<style scoped>
  .sortMenu .cell {
  display: block;
  font-size: 16px;
  height: 0.88rem;
  line-height: 0.88rem;
  padding: 0 28px 0 28px;

  color: #bbbdbf;
  text-align: center;
  position: relative;
  text-overflow: ellipsis;
  word-break: keep-all;
}
.dora{
     font-size: 18px !important;
  color:#000 !important;
  border-bottom: 2px solid #fd4689;
}
</style>
