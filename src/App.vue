<template>
  <div id="app" data-app app-data="true" light>
    <img
      class="backgroundImg"
      src="./components/storage/silhouette-g805938d33_1920.jpg"
    />
    <div class="Todolists">
      <TodoLists />
    </div>
  </div>
</template>
<script>
import TodoLists from "./components/TodoLists.vue";
export default {
  name: "App",
  components: {
    TodoLists,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
}
.backgroundImg {
  width: 1280px;
  position: fixed;
}
</style>
