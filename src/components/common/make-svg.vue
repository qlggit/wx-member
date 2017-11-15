<template>
  <div>

  </div>
</template>
<script>
  function getParent(){
    return ({
      room:roomG,
      table:tableG,
      chair:chairG
    })[drawOptions.drawCategory];
  }
  function getColor(){
    return ({
      room:'rgb(0,255,255)',
      table:'rgb(255,255,0)',
      chair:'rgb(255,0,255)'
    })[drawOptions.drawCategory];
  }
</script>
