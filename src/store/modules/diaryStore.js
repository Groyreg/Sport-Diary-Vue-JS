import Vue from 'vue'

const diaryStore = {
  namespaced: true,
  state: {
    diary : {
      id : '',
      name : '',
      days : [{
        id : '',
        date: '',
        note: '',
        diary_id: '',
        activities: [{
          id:'',
          day_id:'',
          type_id:'',
          time_start:'',
          duration:'',
          description:''
        }]
      }]
    },
    activity_types: [
    {
        name:'Сон',
        id: 0
      },
      {
        name: 'Водв',
        id: 1
      },
      {
        name: 'Самочувствие',
        id: 2
      },
      {
        name: 'Прием пищи',
        id: 3
      },
      {
        name: 'Тренировка',
        id: 4
      },
      {
        name: 'Измерения',
        id: 5
      },
      { name: 'Спорттесты',
        id: 7
      }],
    current_activity : {
        id:'',
        day_id:'',
        date:'',
        type_id:'',
        time_start:'',
        duration:'',
        description:''
    },
    user_info : {},
    looseweight:{},
    sportpoints:{},
    diary_current_day: {
      date : '',
      activities : []
    },
    eventMonth:{},
    diary_icons: [
      {
        name:'sleep',
        id: 0
      },
      {
        name: 'water',
        id: 1
      },
      {
        name: 'heart',
        id: 2
      },
      {
        name: 'food',
        id: 3
      },
      {
        name: 'gantelya',
        id: 4
      },
      {
        name: 'measure',
        id: 5
      },
      { name: 'seconds',
        id: 7
      }]

  },
  mutations: {
    SET_ACTIVITY_TYPES: (state, { types }) => {
      state.activity_types = types
    },
    SET_CURRENT_ACTIVITY: (state, { activity }) => {
      state.current_activity = activity
    },
    SET_DIARY: (state, { diary }) => {
      state.diary = diary
    },
    SET_CURRENT_USER: (state, { user }) => {
      state.user_info = user
    },
    SET_CURRENT_USER_GENOTYPES: (state, { genotypes }) => {
      Vue.set(state.user_info, 'genotypes', genotypes);
      // state.user_info.genotypes = genotypes
    },
    SET_LOOSE_WEIGHT: (state, {looseweight}) => {
      state.looseweight = looseweight
    },
    SET_SPORT_POINTS: (state, {sportpoints}) => {
      state.sportpoints = sportpoints
    },
    SET_DIARY_CURRENT_DAY:(state, currentDay)=>{
      state.diary_current_day = currentDay
    },
    SET_EVENT_MONTH:(state, date)=>{
      state.eventMonth = date
    }
  },
  actions: {
    INIT_DIARY_CURRENT_DAY:function ({state, commit}) {
      let dateObj = new Date();
      let date = dateObj.getFullYear()+"/"+(1+dateObj.getMonth())+"/"+dateObj.getDate();
      let day = state.diary.days.find(d=>d.date===date);
      let events = this.events.filter(function(event) {
        return isEqualDateStr(event.date, date)
      })
    },
    LOAD_ACTIVITY_TYPES: function ({ commit }) {
      Vue.axios.get("/activitytype/").then((response) => {
        console.log(response.data);
        commit('SET_ACTIVITY_TYPES', { types: response.data });
      }), (err) => {
        console.log(err)
      }
    },

    LOAD_DIARY: function ({ commit, state }) {
      if (state.user_info && state.user_info.diary_id!=null) {
        Vue.axios.get("/diary/" + state.user_info.diary_id).then((response) => {
          console.log(response.data);
          commit('SET_DIARY', {diary: response.data});
        }), (err) => {
          console.log(err)
        }
      }
      else{
        commit('SET_DIARY', {diary: null});
      }
    },

    UPDATE_ACTIVITY: function ({ commit, state }, activity) {
      console.log("UPDATE_ACTIVITY" + activity);
        Vue.axios.put("/activity/"+activity.id, activity).then((response) => {
          console.log(response.data);
          this.dispatch('diary/LOAD_DIARY');
          // commit('SET_DIARY', {diary: response.data});
        }), (err) => {
          console.log(err)
        }
    },

    DELETE_ACTIVITY: function ({state}, activity_id) {
      console.log("diaryStrore DELETE_ACTIVITY 1" + JSON.stringify(activity_id));
      Vue.axios.delete("/activity/"+activity_id).then((response) => {
        console.log("DELETE_ACTIVITY 2" + JSON.stringify(response.data));
        this.dispatch('diary/LOAD_DIARY');
      }), (err) => {
        console.log("DELETE_ACTIVITY 3" + JSON.stringify(err))
      }
    },

    CREATE_ACTIVITY: function ({ commit, state }, activity) {
      console.log("CREATE_ACTIVITY" + activity);
      if (!activity.day_id){
        let day =  state.diary.days.filter(d=>d.date===activity.date);
        let diary_id = state.diary.id;
        if (!day.length){
          Vue.axios.post("/diaryday/", {
            id : null,
            date: activity.date,
            note: null,
            diaryId: diary_id
          }).then((response) => {
            console.log(response.data);
            activity.day_id = response.data.id;
            Vue.axios.post("/activity/", activity).then((response) => {
              console.log(response.data);
              this.dispatch('diary/LOAD_DIARY');
            }), (err) => {
              console.log(err)
            }
          }), (err) => {
            console.log(err)
          }
        }
      }
      else {
        Vue.axios.post("/activity/", activity).then((response) => {
          console.log(response.data);
          this.dispatch('diary/LOAD_DIARY');
          // commit('SET_DIARY', {diary: response.data});
        }), (err) => {
          console.log(err)
        }
      }
    },

    SET_CURRENT_ACTIVITY: function ({ commit }, activity) {
      console.log("SET_CURRENT_ACTIVITY",activity);
      commit('SET_CURRENT_ACTIVITY', {activity:activity});
    },
    SET_CURRENT_USER: function ({ commit }, user) {
      console.log("SET_CURRENT_USER",user);
      commit('SET_CURRENT_USER', {user:user});
      this.dispatch('diary/LOAD_LOOSE_WEIGHT');
      this.dispatch('diary/LOAD_SPORT_POINTS');
    },
    UPDATE_USER_INFO: function ({ commit }, user_info) {
      console.log("UPDATE_USER_INFO" + user_info);
      Vue.axios.put("/userinfo/"+user_info.id, user_info).then((response) => {
        commit('SET_CURRENT_USER', {user:response.data});
        this.dispatch('diary/LOAD_LOOSE_WEIGHT');
        this.dispatch('diary/LOAD_SPORT_POINTS');
      }), (err) => {
        console.log(err)
      }
    },
    UPDATE_GENOTYPES: function ({ commit, state }, genotypes) {
      console.log("UPDATE_GENOTYPES");
      Vue.axios.post("/usergenotypes/all/", {id: state.user_info.id, genotypes: genotypes}).then((response) => {
        console.log("UPDATE_GENOTYPES" + response);
        commit('SET_CURRENT_USER_GENOTYPES', {genotypes:response.data});
        this.dispatch('diary/LOAD_LOOSE_WEIGHT');
        this.dispatch('diary/LOAD_SPORT_POINTS');
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_LOOSE_WEIGHT: function ({ commit, state }) {
      Vue.axios.get("/usergenotypes/"+state.user_info.id+"/looseweight/").then((response) => {
        console.log("SET_LOOSE_WEIGHT" + response.data);
        commit('SET_LOOSE_WEIGHT', { looseweight: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    LOAD_SPORT_POINTS: function ({ commit, state }) {
      Vue.axios.get("/usergenotypes/"+state.user_info.id+"/sportpoints/").then((response) => {
        console.log("SET_SPORT_POINTS" + response.data);
        commit('SET_SPORT_POINTS', { sportpoints: response.data });
      }), (err) => {
        console.log(err)
      }
    },
    SET_EVENT_MONTH({commit}, date) {
            commit('SET_EVENT_MONTH', date)
        }
  },
  getters: {
    activityTypes: state => {
      return state.activity_types;
    },
    currentActivity: state => {
      return state.current_activity;
    },
    getDiary: state => {
      return state.diary;
    },
    getUser: state => {
      return state.user_info;
    },
    getUserGenotypes: state => {
      return state.user_info.genotypes;
    },
    getDayByDate: (state, date) =>{
      return state.diary.days.filter(d=>d.date===date);
    },
    getUserLooseWeight: state => {
      return state.looseweight;
    },
    getSportPoints: state => {
      return state.sportpoints;
    },
    getFoodIntakesActivities: state => {
      let activities =[];
      for (let day of state.diary.days) {
        activities = [...activities, ...day.activities.filter(act => act.type_id === 3 && act.activityFoodIntakes.length > 0)];
      }
      return activities;
    },
    getEventMonth: state => {
            return state.eventMonth
    },
    getDiaryIcons: state => {
            return state.diary_icons
    },
  }
};

export default diaryStore
