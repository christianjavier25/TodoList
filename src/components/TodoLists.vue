<template>
  <v-card color="#b3c5d4" class="todoListCard">
    <h1 class="title">Todo List</h1>
    <p v-if="limit1">{{ limit1 }}</p>
    <p class="warningMess" v-if="limit2">{{ limit2 }}</p>
    <v-btn class="btn-task" color="#2778e2" @click="isAddFormOpen = true"
      >Add Task</v-btn
    >
    <v-card v-if="emptyState"
      ><v-card-text
        ><p>
          {{ emptyState }} <br />
          {{ emptyState2 }}
        </p></v-card-text
      ></v-card
    >
    <v-dialog
      v-model="isAddFormOpen"
      transition="dialog-top-transition"
      width="400px"
    >
      <v-card class="add-task">
        <todo-add-form @AddTask="taskName" @cancel="isAddFormOpen = false" />
      </v-card>
    </v-dialog>
    <v-data-table
      :items="todos"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
      class="tasks"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
            v-bind:class="{ 'is-completed': item.completed }"
          >
            <td class="check-Box">
              <input
                class="check-Box"
                type="checkbox"
                @change="markCompleted(item)"
              />
            </td>
            <td>
              <div class="Ttitle">{{ item.taskTitle }}</div>
            </td>
            <td class="del">
              <button class="del" @click="deltask(item.id)">
                <img width="30px" src="./storage/icons8-remove-96.png" />
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

    <!-- <v-pagination
      class="pagination"
      v-model="page"
      dark
      :length="pageCount"
    ></v-pagination> -->

    <v-dialog width="400px" v-model="isdeleteWarningOpen">
      <v-card class="modalToDelete" width="400px">
        <v-icon>mdi-delete</v-icon>
        <h2>Are you sure?</h2>
        <br />
        <v-card-text>
          <p>This Process cannot be undone.</p>
        </v-card-text>
        <v-card-actions class="del-btn">
          <v-btn @click="isdeleteWarningOpen = false">cancel</v-btn
          ><v-btn @click="confirmDelete" color="#f55252">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="400px" v-model="sameTaskName">
      <v-card class="modalToDelete" width="400px">
        <h2>Ooopps !</h2>
        <br />
        <v-card-text>
          <p>The task name you want to add is already exist</p>
        </v-card-text>
        <v-card-actions class="del-btn">
          <v-btn @click="sameTaskName = false">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { nanoid } from "nanoid";
import TodoAddForm from "./todoAddForm.vue";
export default {
  name: "todo-list",
  components: {
    TodoAddForm,
  },
  data() {
    return {
      page: 1,
      pageCount: 1,
      itemsPerPage: 5,
      idToDelete: null,
      todolist: this.todos,
      limit1: "Note: Maximum of 5 task only..",
      limit2: null,
      emptyState: null,
      sameTaskName: false,
      emptyState2: "You can add task/goals by clicking Add Task Button",
      todos: [
        {
          id: 1,
          taskTitle: "Do some exercise today",
          completed: false,
        },
        {
          id: 2,
          taskTitle: "Eat healthy diet",
          completed: false,
        },
        {
          id: 3,
          taskTitle: "Sleep 8 hours a day",
          completed: false,
        },
      ],
      taskNames: [],
      isAddFormOpen: false,
      isdeleteWarningOpen: false,
    };
  },

  methods: {
    deltask(id) {
      this.isdeleteWarningOpen = true;
      this.idToDelete = id;
    },
    confirmDelete() {
      this.todos = this.todos.filter((todo) => todo.id !== this.idToDelete);
      if (this.todos.length < 1) {
        this.emptyState = "Currenlty no task to do!";
      }
      if (this.todos.length < 6) {
        this.limit1 = "Note: Maximum of 5 task only..";
        this.limit2 = null;
      }
      this.isdeleteWarningOpen = false;
    },
    taskName(taskName) {
      if (this.todos.length >= 5) {
        this.limit2 = "You have reach the maximum task..";
        this.limit1 = null;
      } else {
        this.todos.push({
          id: nanoid(),
          taskTitle: taskName,
          completed: false,
        });
      }
      this.emptyState = null;
      this.isAddFormOpen = false;
    },
    markCompleted(item) {
      item.completed = !item.completed;
    },
  },
};
</script>
<style scoped>
.todoListCard {
  position: absolute;
  left: 100px;
  top: 70px;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 550px;
  padding: 20px;
}
.is-completed {
  text-decoration: line-through red;
  /* border: 2px solid blue ; */
  background-color: rgb(157, 169, 179);
}
.warningMess {
  color: #ff0000;
}
.btn-task {
  position: absolute;
  right: 50px;
  top: 60px;
}
.title {
  margin-bottom: 50px;
}
p {
  font-size: 18px;
}
tr {
  border: 1px solid;
}
.Ttitle {
  font-size: 20px;
}
.cardTable {
  padding: 20px;
}

.todolistTable {
  color: #ff0000(245, 6, 6);
  margin: 5px;
}
.v-data-table {
  line-height: normal;
}

.taskTitle {
  text-align: center;
  font-size: 20px;
}
input.check-Box {
  width: 30px;
  height: 30px;
  border-radius: 10%;
}
.todoItem {
  padding: 50px;
  border-bottom: 1px solid rgb(9, 186, 245);
}
.tasks {
  font-size: 20px;
}
.modalToDelete {
  text-align: center;
  padding: 20px;
}
.del-btn {
  justify-content: space-between;
}
.pagination {
  position: absolute;
  bottom: 20px;
  right: 230px;
}
.add-task {
  padding: 50px;
}
tr {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  max-height: 100px;
}
@media only screen and (max-width: 800px) {
  .todoListCard {
    width: 500px;
    left: 50px;
  }
  .pagination {
    right: 175px;
  }
}
@media only screen and (max-width: 600px) {
  .todoListCard {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0px;
  }
  .pagination {
    right: 220px;
  }
}
@media only screen and (max-width: 500px) {
  .todoListCard {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0px;
  }
  .pagination {
    right: 180px;
  }
}
@media only screen and (max-width: 450px) {
  .todoListCard {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0px;
  }
  .pagination {
    right: 150px;
  }
}
@media only screen and (max-width: 400px) {
  .todoListCard {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0px;
  }
  .pagination {
    right: 120px;
  }
}
@media only screen and (max-width: 350px) {
  .todoListCard {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0px;
  }
  .pagination {
    right: 90px;
  }
}
</style>