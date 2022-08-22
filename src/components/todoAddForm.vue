<template>
  <form @submit.prevent="submit">
    <label><h3>Task Name:</h3></label><br />
    <v-text-field v-model="TaskName" dense outlined required />
    <div class="form-btn">
      <v-btn color="#0481f5" type="submit">Add Task</v-btn>
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
    </div>
  </form>
</template>
<script>
export default {
  name: "todoAddForm",
  data() {
    return {
      TaskName: null,
    };
  },
  methods: {
    submit() {
      if (this.TaskName != null) {
        this.$emit("AddTask", this.TaskName);
        this.TaskName = null;
      }
    },
  },
};
</script>
<style scoped>
.form-btn {
  display: flex;
  justify-content: space-between;
}
</style>