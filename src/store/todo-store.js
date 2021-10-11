import { api } from "src/boot/axios";

const state = {
  todoList: [],
};

const getters = {
  allTodoList: (state) => state.todoList,
};

const actions = {

  async fetchTodoList({ commit }) {
    const response = await api.get('/todo/api/task-list/').catch(() => {
      throw '401'
    });
    commit("setTodoList", response.data);
    return response;
  },
  async addTodo({ commit }, todo) {
    const response = await api.post('/todo/api/task-list/', todo);
    commit("newTodo", response.data);
    return response
  },
  async updateTodo({ commit }, todo) {
    let item = {
      title: todo.title,
      completed: !todo.completed
    }
    const response = await api.post(`/todo/api/task-detail/${todo.id}/`, JSON.stringify(item));
    commit("updTodo", response.data);
    return response;
  },
  async removeTodo({ commit }, todo) {
    const response = await api.delete(`/todo/api/task-detail/${todo.id}/`);
    commit("deleteTodo", todo);
    return response;
  },
};

const mutations = {
  setTodoList: (state, todoList) => (state.todoList = todoList),
  newTodo: (state, todo) => state.todoList.unshift(todo),
  updTodo: (state, updatedTodo) => {
    const index = state.todoList.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      state.todoList.splice(index, 1, updatedTodo);
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
