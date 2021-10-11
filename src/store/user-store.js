import { api } from "src/boot/axios";
import { SessionStorage } from 'quasar'

const state = {
    user: {
        username: '',
        tokens:{
            access: '',
            refresh: ''
        }
    },
    isAuthenticated: false,
};
const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
    username: (state) => state.user.username,
    token: (state) => state.user.tokens.access,
};
const mutations = {
    setUsername: (state, username) => (state.user.username = username),
    getUserCredential: (state, tokens) => (state.user.tokens = tokens),
    setUser:(state, user) => (state.user = user),
    setLogin: (state, status) => (state.isAuthenticated = status),
};
const actions = {
     
    async register({ commit },user) {
        const response = await api.post(
            'accounts/api/register/',
            user
        )
        
        if (response.status == 201) {
            let username = JSON.parse(response.data)
            commit("setUsername", username);
        }
        return response;
    },
    async login({ commit },user) {
        const response = await api.post(
            'accounts/api/token',
            JSON.stringify(user)
        )
        
        if (response.status == 200) {
            let tokens = response.data
            commit("setLogin", true)
            commit("setUsername", user.username);
            commit("getUserCredential", tokens);
            let userData = {
                username: user.username,
                tokens: tokens
            };
            SessionStorage.set('userData', JSON.stringify(userData));
            SessionStorage.set('Authenticated', true)
        }

        return response;
    },
    loginCheck({ commit }) {
        let userData = SessionStorage.getItem('userData');
        userData = JSON.parse(userData)
        let authenticated = SessionStorage.getItem('Authenticated');
        if (userData) {
            commit("setUser", userData);
            commit("setLogin", authenticated);
            
        }
    },
    logout({ commit }) {
        let user = {
            username: null,
            tokens: null
        };
        commit("setUser", user);
        commit("setLogin", false);
        SessionStorage.remove('userData');
        SessionStorage.remove('Authenticated')
    },
    getToken() {
        let userData = SessionStorage.getItem('userData');
        userData = JSON.parse(userData)
        return userData;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
