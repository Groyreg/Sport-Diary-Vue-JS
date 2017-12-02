import Vue from 'vue'

const staticStore = {
  namespaced: true,
  state: {
    genes : [ {
      // id: 10,
      // name: 'IL15RA',
      // fullname: null,
      // description_eng: null,
      // description_ru: null,
      // snps: [
      //   {
      //     id: 19,
      //     gene_id: 10,
      //     rs: null,
      //     name: null,
      //     name2: null,
      //     description_ru: null,
      //     genotypes: [
      //       {
      //         id: 30,
      //         snp_id: 19,
      //         value: 'CC',
      //         frequency: 21.6,
      //         description_ru: null
      //       },
      //       {
      //         id: 28,
      //         snp_id: 19,
      //         value: 'AA',
      //         frequency: 21.7,
      //         description_ru: null
      //       },
      //       {
      //         id: 29,
      //         snp_id: 19,
      //         value: 'AC',
      //         frequency: 56.7,
      //         description_ru: null
      //       }
      //     ]
      //   }
      // ]
    }],
    foodgroups : [ {
    }],
    exercises:{},
    wellbeings:{},
    snps:[],
    genotypes:[],
    measurements:[]
  },
  mutations: {
    SET_SNPS: (state, {snps}) => {
      state.snps = snps
    },
    SET_MEASUREMENTS: (state, {measurements}) => {
      state.measurements = measurements
    },
    SET_EXERCISES: (state, {exercises}) => {
      state.exercises = exercises
    },
    SET_WELLBEINGS: (state, {wellbeings}) => {
      state.wellbeings = wellbeings
    },
    SET_GENES: (state, {genes}) => {
      state.genes = genes
    },
    SET_GENOTYPES: (state, {genotypes}) => {
      state.genotypes = genotypes
    },
    SET_FOOD_GROUPS: (state, {foodgroups}) => {
      state.foodgroups = foodgroups
    }
  },
  actions: {
    LOAD_GENES: function ({ commit }) {
      Vue.axios.get("/gene/").then((response) => {
        console.log(response.data);
        commit('SET_GENES', { genes: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_MEASUREMENTS: function ({ commit }) {
      Vue.axios.get("/measurement/").then((response) => {
        console.log(response.data);
        commit('SET_MEASUREMENTS', { measurements: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_SNPS: function ({ commit }) {
      Vue.axios.get("/snp/").then((response) => {
        console.log(response.data);
        commit('SET_SNPS', { snps: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_GENOTYPES: function ({ commit }) {
      Vue.axios.get("/genotype/").then((response) => {
        console.log(response.data);
        commit('SET_GENOTYPES', { genotypes: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_WELLBEINGS: function ({ commit }) {
      Vue.axios.get("/wellbeing/").then((response) => {
        console.log(response.data);
        commit('SET_WELLBEINGS', { wellbeings: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_EXERCISES: function ({ commit }) {
      Vue.axios.get("/sport/exercise/").then((response) => {
        console.log(response.data);
        commit('SET_EXERCISES', { exercises: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_FOOD_GROUPS: function ({ commit }) {
      Vue.axios.get("/foodgroup/").then((response) => {
        console.log(response.data);
        commit('SET_FOOD_GROUPS', { foodgroups: response.data });
      }), (err) => {
        console.log(err)
      }
    }
  },
  getters: {
    getGenes: state => {
      return state.genes;
    },
    getGenotypes: state => {
      return state.genotypes;
    },
    getSnps: state => {
      return state.snps;
    },
    getExercises: state => {
      return state.exercises;
    },
    getWellbeings: state => {
      return state.wellbeings;
    },
    getFoodGroups: state => {
      return state.foodgroups;
    },
    getMeasurements: state => {
      return state.measurements;
    }
    // ,
    // getDayByDate: (state, date) =>{
    //   return state.diary.days.filter(d=>d.date===date);
    // }
  }
};

export default staticStore
