<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 backdrop-opacity-100 visible z-10">
      <div class="flex items-center justify-center pt-56 ">
        <div class="text-xl bg-blue-300 text-black border-double border-4 border-black-500 max-w-4xl p-5">
            <span>Are you sure you want to delete task "{{task.title}}" ?</span>
          <div class="flex justify-around">
            <button id="yes"
                    class="text-base w-20 h-10 mt-8 mr-4 ml-2 border-double border-2 border-black bg-gray-200"
                    @click="deleteTask"
            >YES</button>
            <button id="no"
                    class="text-base w-20 h-10 mt-8 mr-4 ml-2 border-double border-2 border-black bg-gray-200"
                    @click="closeModal"
            >NO</button>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  export default {
    name: 'ModalTask',

    props: {
      task: {
        type: Object,
        default: () => {},
      },
    },

    methods: {
      closeModal(id) {
        this.$emit('close-modal', id)
      },
      deleteTask(id){
        this.$emit('delete-task', id)
      },
    },
  }

</script>