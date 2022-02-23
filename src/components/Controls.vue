<template>
  <div class="flex justify-between my-4">
    <p class="score"
       id="left"> {{ counter }} </p>
    <p class="hover:text-purple-600"
       @click="AllClearTasks">
      Clear Completed</p>
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
        let interest = Math.floor(this.completedTasks.length / this.tasks.length * 100);
        if (this.tasks.length !== 0) {
          return `${this.completedTasks.length} / ${this.tasks.length} ( ${interest}% done)`;
        } else {
          return ``;
        }
      },
    },

    methods:{
      AllClearTasks() {
        this.$emit('clear-task')
      }
    },
  }
</script>
