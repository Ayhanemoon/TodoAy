<template>
  <q-list bordered separator dense class="rounded-borders todo-list">
    <q-item v-ripple v-for="(item, index) in TodoList" :key="item.id" class="todo-item">
      <q-item-section
        class="col-1 flex flex-center item-center todo-number"
        avatar
        top
      >
        <q-avatar color="white" text-color="cyan-9" size="22px" dense>{{
          index+1
        }}</q-avatar>
      </q-item-section>
      <q-item-section top class="col-9">
        <q-item-label class="item-title text-white q-mt-sm">{{
          item.title
        }}</q-item-label>
      </q-item-section>
      <q-item-section class="col-3">
        <div class="text-white q-gutter-xs flex flex-center item-center">
          <q-btn size="12px" @click.prevent="confirmDelete" flat dense round icon="delete" />
          <q-btn size="12px" @click="changeStatus(item)" flat dense round :icon="setIcon(item.completed)" />
          <q-dialog v-model="deleteConfirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="dangerous" color="negative" text-color="white" />
                <span class="q-ml-sm">Are you sure you want to delet this?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="secondary" v-close-popup />
                <q-btn flat @click.prevent="deleteTodo(item)" label="Delete" color="negative" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { useStore } from 'vuex';
import { defineComponent, ref } from 'vue';
import { useQuasar} from 'quasar';

export default defineComponent ({
  name: "TodoList",
  props: {
    TodoList: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();

    let deleteConfirm = ref(false);

    function setIcon(complete) {
        return complete ? "remove_done" : "done";
    }

    function confirmDelete() {
      deleteConfirm.value = !deleteConfirm.value;
    }

    function deleteTodo(item) {
      store.dispatch('todoList/removeTodo', item).then(() => {
        $q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Item deleted successfully.',
          position: 'top-right',
        });
        store.dispatch('todoList/fetchTodoList');
      }).catch(() => {
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Something goes wrong! pleas try again.',
          position: 'top-right',
        });
      })
    }

    function changeStatus(item) {
      let message = item.completed ? 'todo' : 'completed';
      store.dispatch('todoList/updateTodo', item).then(() => {
        $q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'check_circle',
          message: `Item marked as ${message}.`,
          position: 'top-right',
        });
        store.dispatch('todoList/fetchTodoList');
      }).catch(() => {
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Something goes wrong! pleas try again.',
          position: 'top-right',
        });
      })
    }
    return {
      deleteConfirm,
      setIcon,
      deleteTodo,
      changeStatus,
      confirmDelete
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-list {
  max-width: 100%;

  .todo-number {
    padding: 2px;
  }

  .todo-item {
    .item-title {
      @media (max-width: $breakpoint-xs-max) {
        padding-left: 5px;
      }
    }
  }
}

.q-list--dense > .q-item,
.q-item--dense {
  padding: 2px 28px 2px 2px !important;
}
</style>
