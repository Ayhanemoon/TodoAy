<template>
  <q-page class="bg-cyan-9 flex flex-center">
    <q-card bordered class="todo-card">
      <q-card-section class="text-white">
        <div class="text-h3 text-center">Todo List</div>
        <div class="text-subtitle2 text-center">by Ayhanemoon</div>
      </q-card-section>
      <q-separator spaced dark />
      <q-card-section>
        <div class="row flex flex-center">
          <div class="col-12">
            <q-input
              label-color="white"
              color="white"
              input-class="text-white"
              bottom-slots
              v-model="todo"
              label="ToDo"
              counter
              maxlength="25"
            >
              <template v-slot:before>
                <q-icon name="book" color="white" />
              </template>

              <template v-slot:hint>
                <span class="text-white"
                  >Enter your thing!
                  <q-icon name="face" color="white" size="18px"
                /></span>
              </template>

              <template v-slot:append>
                <q-btn color="white" @click.prevent="addTodo" round dense flat icon="add" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="todoList.length > 0" class="list-section">
        <q-tabs v-model="tab" class="text-white" :class="{'bg-cyan-8': $q.screen.lt.sm}">
          <q-tab label="To Do" name="todo" />
          <q-tab label="Completed" name="complete" />
        </q-tabs>

        <q-separator />

        <q-tab-panels class="todo-panels" v-model="tab" animated>
          <q-tab-panel class="todo-panel" name="todo">
            <TodoList :TodoList="todos" />
          </q-tab-panel>

          <q-tab-panel class="todo-panel" name="complete">
            <TodoList :TodoList="completed" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-section v-else>
        <div class="row flex flex-center">
          <div class="col-12 flex flex-center">
            <q-icon name="lightbulb" color="white" size="34px" />
            <div class="text-h6 text-white">There is nothing to do</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import { useQuasar, QSpinnerFacebook, useMeta } from 'quasar';
import { setToken } from '../boot/axios'

export default defineComponent({
  name: "PageIndex",
  components: {
    TodoList
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    const $q = useQuasar();

    // Meta Tags
    const metaData = {
      title: 'ToDoAy',
      titleTemplate: title => `${title}`,

      // meta tags
      meta: {
        description: { name: 'description', content: 'ToDo list App' },
        keywords: { name: 'keywords', content: 'todo,vue,javascript,django,python' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        ogTitle:  {
          property: 'og:title',
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template (ogTitle) {
            return `${ogTitle}`
          }
        }
      },
    }
    useMeta(metaData);
    
    // Loading 
    let timer
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })
    function showLoading () {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'white',
        spinnerSize: 100,
        backgroundColor: 'black',
        message: 'ToDo List loading...',
        messageColor: 'white'
      })

      // hiding in 3s
      timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
      }, 3000)
    }

    onBeforeMount(() => {
      showLoading();
      store.dispatch('userStore/getToken')
      .then((respons) => {
        let token = respons.tokens.access;
        setToken(token);
      })
      .then(() => {
        store.dispatch('todoList/fetchTodoList').catch((res) => {
          if (res == '401') {
            store.dispatch('userStore/logout')
            router.replace({ name: 'login' });
          }
        });
      });
    })
    
    // Todo 
    const todo = ref('');
    const todoList = computed(() => store.getters['todoList/allTodoList']);
    const todos = computed(() => {
      return todoList.value.filter(todo => todo.completed === false)
    });
    const completed = computed(() => {
      return todoList.value.filter(todo => todo.completed == true)
    });

    function addTodo() {
      let item = {
        title: todo.value
        }
      store.dispatch('todoList/addTodo', JSON.stringify(item)).then(() => {
        $q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Yor Job added successfully.',
          position: 'top-right',
        });
        store.dispatch('todoList/fetchTodoList');
      }).catch(() => {
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'outlet',
          message: 'Something goes wrong! pleas try again.',
          position: 'top-right',
        });
      });
      todo.value = '';
    }

    return {
      tab: ref("todo"),
      todoList,
      todo,
      todos,
      completed,
      addTodo,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-card {
  width: 95%;
  max-width: 600px;
  height: 620px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  .list-section {
    height: 370px;

    .todo-panels {
      background: transparent;

      .todo-panel {
        height: 300px;
        overflow-y: auto;
        overflow-x: hidden;

        @media (max-width: $breakpoint-xs-max) {
          height: 280px;
        }
      }
    }

    @media (max-width: $breakpoint-xs-max) {
      height: 330px;
    }
  }

  @media (max-width: $breakpoint-xs-max) {
    height: 590px;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none
  }
}
</style>
