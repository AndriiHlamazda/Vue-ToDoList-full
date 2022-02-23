<template>
  <div class="ToDoInput">
    <input
      class="w-full text-3xl border-solid border-2 border-grey bg-gray-100 rounded my-0,5 px-2.5 py-2"
      type="text"
      placeholder="Create a new todo..."
      v-model="newTask"
      @keyup.enter="addTask"
    />
  </div>
</template>

<script>

  export default {
    name: 'ToDoInput',

    props: {
      tasks: {
        type: Array,
        default: () => [],
      },

    },

    data() {
      return {
        newTask: ''
      }
    },


    methods: {
      addTask() {
        if (this.newTask !== '') {
        this.$emit('create-task', this.newTask);
        this.newTask = ''
        }
      }
    }
  }
</script>