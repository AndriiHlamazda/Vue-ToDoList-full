<template>
  <div class="TaskList">
    <TaskListItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete-task="completeTask"
      @delete-task="deleteTask"
      @update-task="updateTask"
    />
  </div>
</template>

<script>
import TaskListItem from './TaskListItem';

export default {
  name: 'TaskList',
  components: { TaskListItem },
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    completeTask(id) {
      this.$emit('complete-task', id);
    },
    deleteTask(id) {
      this.$emit('delete-task', id);
    },
    updateTask(id, title) {
      this.$emit('update-task', id, title);
    },
  },
};
</script>
