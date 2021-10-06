<template>
  <q-list bordered separator dense class="rounded-borders todo-list">
    <q-item v-for="(item, index) in TodoList" :key="item.id" class="todo-item">
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
          <q-btn size="12px" flat dense round icon="delete" />
          <q-btn size="12px" flat dense round :icon="setIcon(item.completed)" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    TodoList: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function setIcon(complete) {
        return complete ? "remove_done" : "done";
    }
    return {
      setIcon
    };
  },
};
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
