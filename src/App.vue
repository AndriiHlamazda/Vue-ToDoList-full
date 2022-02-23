/* eslint-disable */
<template>
  <div id="vue-app" class="max-w-2xl m-auto ">
    <div class="text-7xl m-14 text-white">
      <h1>Todo</h1>
    </div>
    <ul id="active">
      <TaskList
        @complete-task="updateTaskStatus"
        @delete-task="deleteTask"
        @update-task="updateTask"
        :tasks="activeTasks"
      />
    </ul>
    <ToDoInput @create-task="createTask"/>
    <div>
      <ul id="comp">
        <TaskList
          @complete-task="updateTaskStatus"
          @delete-task="deleteTask"
          :tasks="completedTasks"
        />
      </ul>
    </div>
    <ControlsTask
      :tasks="tasks"
      @clear-task="allClearTasks"
    />
  </div>
</template>

<script>
  import ToDoInput from './components/ToDoInput'
  import TaskList from './components/TaskList'
  import ControlsTask from './components/Controls'
  import gql from 'graphql-tag'

  export default {
    name: 'App',
    components: {
      ToDoInput,
      TaskList,
      ControlsTask,
    },


    data() {
      return {
        tasks: [],
      };
    },

    apollo: {
      tasks: gql`query {
        tasks {
          id
          title
          isDone
        }
      }`,
    },


    computed: {
      completedTasks() {
        return this.tasks.filter(task => task.isDone);
      },

      activeTasks() {
        return this.tasks.filter(task => !task.isDone);
      },
    },

    methods: {

      async createTask(newTask) {
        const result = await this.$apollo.mutate({
          mutation: gql`mutation ($label: String!) {
            createTask(createTaskInput: {title: $label}) {
              id
              title
              isDone
              }
            }`,
          variables: {
            label: newTask
          },
        });
        this.tasks.push(result.data.createTask);
      },


      async updateTaskStatus(id) {
        console.log('updateTaskStatus');
        const task = this.tasks.find(task => task.id === id);
        const result = await this.$apollo.mutate({
          mutation: gql`mutation ($id: String!, $isDone: Boolean!) {
            updateTaskStatus(id: $id, isDone: $isDone){
              id
              title
              isDone
            }
          }`,
          variables: {
            id,
            isDone: task.isDone,
          },
        });
        await this.$apollo.queries.tasks.refetch();
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.tasks.push(result.data.updateTaskStatus);
      },

      async updateTask(id, title) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          const tasks = [ ...this.tasks ];
          const { data: { updateTask } } =  await this.$apollo.mutate({
            mutation: gql`mutation ($id: String!, $label: String!) {
             updateTask(createTaskInput: {title: $label} id: $id) {
               title
             }
           }`,
            variables: {
              id,
              label: title,
            },
          });
          tasks[index].title = updateTask.title;
          this.tasks = tasks;
        }
      },


      async deleteTask(id) {
        await this.$apollo.mutate({
          mutation: gql`mutation ($id: String!) {
            deleteTask(id: $id) {
              id
            }
          }`,
          variables: { id },
        });
        this.tasks = this.tasks.filter(task => task.id !== id);
      },


      async allClearTasks() {
          const compTask = this.tasks.filter(task => {
            return task.isDone
          });
          if (compTask.length !== 0) {
            const result = await this.$apollo.mutate({
              mutation: gql`mutation {
            clearTask {
            id
            title
            isDone
            mode
            }
          }`
            });
            this.tasks = result.data.clearTask;
          }

      }
    },
  }
</script>

<style>
  body {
    background-image: url(assets/1559370648_6.jpeg);
    background-size: 100% 26%;
    background-repeat: no-repeat;
    cursor: default;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100vw;
  }
</style>
