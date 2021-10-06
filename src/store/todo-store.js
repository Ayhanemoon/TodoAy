// Tasks module
import axios from "axios";



const state = {
  todoList: [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      title: "et porro tempora",
      completed: true,
    },
    {
      userId: 1,
      id: 5,
      title:
        "laboriosam mollitia et enim quasi adipisci quia provident illum",
      completed: false,
    },
    {
      userId: 1,
      id: 6,
      title: "qui ullam ratione quibusdam voluptatem quia omnis",
      completed: false,
    },
    {
      userId: 1,
      id: 7,
      title: "illo expedita consequatur quia in",
      completed: false,
    },
    {
      userId: 1,
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: true,
    },
    {
      userId: 1,
      id: 9,
      title: "molestiae perspiciatis ipsa",
      completed: false,
    },
    {
      userId: 1,
      id: 10,
      title: "illo est ratione doloremque quia maiores aut",
      completed: true,
    },
    {
      userId: 1,
      id: 11,
      title: "vero rerum temporibus dolor",
      completed: true,
    },
    {
      userId: 1,
      id: 12,
      title: "ipsa repellendus fugit nisi",
      completed: true,
    },
  ],
};

const getters = {
  allTodoList: (state) => state.todoList,
};

const actions = {
  async fetchTodoList({ commit }) {
    const response = await axios.get('/todo');
    commit("setTodoList", response.data);
  },
  async addTodo({ commit }, todo) {
    const response = await axios.post('/todo', todo);
    commit("newTodo", response.data);
  },
  async updateTodo({ commit }, todo) {
    const response = await axios.put(`/todo/${todo.id}`, todo);
    commit("updTodo", response.data);
  },
  async removeTodo({ commit }, todo) {
    const response = await axios.delete(`/todo/${todo.id}`);
    commit("deleteTodo", todo);
  },
};

const mutations = {
  setTodoList: (state, todoList) => (state.todoList = todoList),
  newTodo: (state, todo) => state.todoList.unshift(todo),
  updTodo: (state, updatedTodo) => {
    const index = state.todoList.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      state.todoList.splice(index, 1, updatedTask);
    }
  },
  deleteTodo: (state, todo) =>
    (state.todoList = state.todoList.filter((t) => todo.id !== t.id)),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
