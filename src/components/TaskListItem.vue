<template>
  <div>
  <li
    class="flex justify-between items-center text-3xl border-solid border-2 border-grey bg-gray-100 rounded my-0,5 px-2.5 py-2"
  >
    <div class="flex justify-between items-center">
      <label for="list">
      <input
        id="list"
        type="checkbox"
        class="transform scale-150"
        :checked="task.isDone"
        @click="completeTask"
      >
      </label>
      <span
        v-if="mode"
        class="ml-2"
        :class="{ [`line-through text-gray-500`]: task.isDone }"
        @dblclick="editTitleMode"
      >
        {{ task.title }}
      </span>
      <input
        v-else
        v-model="title"
        v-focus
        type="text"
        class="outline-none ml-2"
        @keyup.enter ="updateTask"
      >
    </div>
    <i
       class="material-icons"
       @click="modalShow"
       @keypress="modalShow"
>
      clear
    </i>
  </li>
  <ModalTask
    v-if="isInfoModal"
    :task="task"
    @delete-task="deleteTask"
    @close-modal="closeModal"
  />
  </div>
</template>

<script>
import ModalTask from './Modal';

export default {
  name: 'TaskListItem',
  components: { ModalTask },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  props: {
    task: {
      type: Object,
      default: () => {
      },
    },
  },

  data(vm) {
    return {
      isInfoModal: false,
      mode: true,
      title: vm.task.title,
    };
  },

  methods: {
    closeModal() {
      this.isInfoModal = false;
    },
    completeTask() {
      this.$emit('complete-task', this.task.id);
    },
    deleteTask() {
      this.$emit('delete-task', this.task.id);
    },
    editTitleMode() {
      if (this.task.isDone !== true) {
        this.mode = false;
      }
    },

    updateTask() {
      this.$emit('update-task', this.task.id, this.title);
      this.mode = true;
    },

    modalShow() {
      this.isInfoModal = true;
    },

  },

};
</script>
