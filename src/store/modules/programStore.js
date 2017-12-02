import Vue from 'vue'

const programStore = {
  namespaced: true,
  state: {
    programs : [{
    }]
  },
  mutations: {
    SET_PROGRAM: (state, {programs}) => {
      state.programs = programs
    }
  },
  actions: {
    LOAD_PROGRAM: function ({ commit }) {
      Vue.axios.get("/program/").then((response) => {
        console.log(response.data);
        commit('SET_PROGRAM', { programs: response.data });
      }), (err) => {
        console.log(err)
      }
    }
  },
  getters: {
    getProgram: state => {
      return state.programs[0];
    }
  }
};

export default programStore
