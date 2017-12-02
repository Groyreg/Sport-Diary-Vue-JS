import Vue from 'vue'
import Vuex from 'vuex'
import diaryStore from './modules/diaryStore'
import staticStore from './modules/staticStore'
import programStore from './modules/programStore'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store ({
	state: {
		eventDefault: {
			date: '22'
		}
	},
	actions: {
		addDate({ commit }, date) {
			commit('ADD_DATE', date)
		},
		addEventDefault({ commit }, eventDefault) {
			commit('ADD_EVENT_DEFAULT', eventDefault)
		}
	},
	mutations: {
		ADD_DATE(state, date){
			state.eventDefault.date = date
		},
		ADD_EVENT_DEFAULT(state, eventDefault) {
			state.eventDefault = eventDefault


		}
	},
	getters: {
		eventDefault(state) {
			return state.eventDefault.date
		},
		eventDefault(state) {
			return state.eventDefault
		}
	},
  // plugins: [createPersistedState()],
  modules:{
	  diary:diaryStore,
    static:staticStore,
    program:programStore
  }
})

export default store
