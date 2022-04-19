<template>
<div class="flex justify-between my-4">
  <p
    id="left"
    class="score"
  > {{ counter }}
  </p>
  <p
    class="hover:text-purple-600"
    @click="AllClearTasks"
    @keypress="AllClearTasks"
  >
    Clear Completed
  </p>
</div>
</template>

<script>
export default {
  name: 'ControlsTask',
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.isDone === true);
    },

    activeTasks() {
      return this.tasks.filter(task => task.isDone === false);
    },

    counter() {
      const interest = Math.floor((this.completedTasks.length / this.tasks.length) * 100);

      if (this.tasks.length !== 0) {
        return `${this.completedTasks.length} / ${this.tasks.length} ( ${interest}% done)`;
      }

      return '';
    },
  },
  methods: {
    AllClearTasks() {
      this.$emit('clear-task');
    },
  },
};
</script>
