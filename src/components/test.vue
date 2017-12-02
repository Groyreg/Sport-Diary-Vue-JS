<template id="test">
  <div class="test"><button v-on:click="counter += 1">+1</button><p>Кнопка выше была нажата {{counter}} раз</p></div>
</template>
<script>
  export default {
    data() {
      return {counter:0};
    }
  }
</script>

