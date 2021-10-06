<template>
  <q-page class="bg-cyan-9 flex flex-center">
    <q-card class="login-card">
      <q-card-section class="flex flex-center">
        <q-avatar borderd size="200px" color="cyan-9">
          <img class="avatar" src="~assets/ayhan.png" alt="ayhan" />
        </q-avatar>
      </q-card-section>

      <q-card-section>
        <q-tabs v-model="tab" class="text-white">
          <q-tab label="Login" name="login" />
          <q-tab label="Register" name="register" />
        </q-tabs>
        <q-separator />
        <q-tab-panels class="login-panels" v-model="tab" swipeable animated>
          <q-tab-panel class="login-panel" name="login">
            <q-form @submit="onLogin" class="q-gutter-md">
              <q-input
                v-model="username"
                label="Username"
                placeholder="Ayhanemoon"
                label-color="white"
                color="white"
                input-class="text-white"
              />
              <q-input
                v-model="password"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                placeholder="********"
                label-color="white"
                color="white"
                input-class="text-white"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div>
                <q-btn label="Login" type="Submit" color="teal-5" />
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel class="login-panel" name="register">
              <q-form @submit="onRegister" class="q-gutter-md">
              <q-input
                v-model="username"
                label="Username"
                placeholder="Ayhanemoon"
                label-color="white"
                color="white"
                input-class="text-white"
              />
              <q-input
                v-model="password1"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                placeholder="********"
                label-color="white"
                color="white"
                input-class="text-white"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input
                v-model="password2"
                label="Password Confirm"
                :type="isPwd2 ? 'password' : 'text'"
                placeholder="********"
                label-color="white"
                color="white"
                input-class="text-white"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
              </q-input>

              <div>
                <q-btn label="SignUp" type="Submit" color="teal-5" />
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar();
    
    const tab = ref("login");
    const username = ref("");
    const password = ref("");
    const password1 = ref("");
    const isPwd = ref(true);
    const password2 = ref("");
    const isPwd2 = ref(true);
    

    function onLogin() {
      // login function
    }

    function onRegister() {
      const user = {
          username: username.value,
          password1: password1.value,
          password2: password2.value
      }

      store.dispatch('userStore/register', JSON.stringify(user))
      .then(response => {
        $q.notify({
          color: 'success',
          textColor: 'white',
          icon: 'check_circle',
          message: 'You registeration was successfully.',
          position: 'top-right',
        });
        tab.value = "login";
      }).catch((error) => {
        $q.notify({
          color: 'danger',
          textColor: 'white',
          icon: 'outlet',
          message: 'Something goes wrong! pleas try again.',
          position: 'top-right',
        });
      })
    }

    return {
      tab,
      username,
      password,
      isPwd,
      password1,
      password2,
      isPwd2,
      onRegister,
      onLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 95%;
  max-width: 600px;
  height: 620px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  .avatar {
    height: 95%;
    width: 95%;
  }

  .login-panels {
    background: transparent;

    .login-panel {
      min-height: 300px;
      display: flex;
      justify-content: center;
    }
  }

  @media (max-width: $breakpoint-xs-max) {
    height: 590px;
  }
}
</style>
