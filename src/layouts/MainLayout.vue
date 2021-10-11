<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-cyan-9" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> ToDoAy </q-toolbar-title>

        <div>v.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      class="bg-cyan-8 text-white"
    >
      <q-list>
        <q-item-label header>
          <q-chip
            clickable
            @click="logout"
            dense
            size="lg"
            square
            color="white"
            text-color="cyan"
            :icon="isAuthenticated ? 'logout' : 'bookmark'"
          >
            {{ username || "ToDoAy" }}
          </q-chip>
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition 
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Linkedin",
    caption: "See my resume",
    icon: "fab fa-linkedin",
    link: "https://www.linkedin.com/in/ayhan-samimi/",
  },
  {
    title: "Github",
    caption: "github.com/Ayhanemoon",
    icon: "code",
    link: "https://github.com/Ayhanemoon",
  },
  {
    title: "Telegram",
    caption: "Send me massage!",
    icon: "fab fa-telegram",
    link: "https://telegram.com/ayhanemoon",
  },
  {
    title: "Instagram",
    caption: "@Ayhanemoon",
    icon: "fab fa-instagram-square",
    link: "https://instagram.com/ayhanemoon",
  },
  {
    title: "Twitter",
    caption: "@Ayhanemoon",
    icon: "fab fa-twitter-square",
    link: "https://twitter.com/Ayhanemoon",
  },
  {
    title: "YouTube",
    caption: "@Ayhanemoon",
    icon: "fab fa-youtube",
    link: "https://www.youtube.com/channel/UC02rzltSm1uDU4Ce2E1cdWQ",
  },
  {
    title: "Website",
    caption: "Free Online Courses",
    icon: "favorite",
    link: "https://icc-aria.ir",
  },
];

import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(
      () => store.getters["userStore/isAuthenticated"]
    );
    const username = computed(() => store.getters["userStore/username"]);

    const chipIcon = isAuthenticated.value ? "logout" : "bookmark";

    function logout() {
      if (isAuthenticated.value) {
        store.dispatch("userStore/logout");
        router.replace({ name: "login" });
      } else {
        return;
      }
    }

    const leftDrawerOpen = ref(false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      isAuthenticated,
      username,
      chipIcon,
      essentialLinks: linksList,
      leftDrawerOpen,
      logout,
      toggleLeftDrawer,
    };
  },
});
</script>
