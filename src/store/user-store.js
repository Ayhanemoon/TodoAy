import { api } from "src/boot/axios";
const state = {
    user: {},
    logged: false,
};
const getters = {};
const mutations = {
    registeredUser: (state, user) => (state.user = user),
};
const actions = {
     
    async register({ commit },user) {
        const response = await api.post(
            'accounts/api/auth/register/',
            user,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
            }
        )
        
        if (response.status === 200) {
            commit("registeredUser", response);
        }
        console.log(response)
        return response;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
