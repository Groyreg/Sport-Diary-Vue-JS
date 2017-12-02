import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Diary from '@/components/Diary'
import Program from '@/components/Program'
import Progress from '@/components/Progress'
import Labtests from '@/components/Labtests'
import Menu from '@/components/Menu'
import Fooddiary from '@/components/Fooddiary'
import Registration from '@/components/regForm'
import About from '@/components/about'
import Profile from '@/components/profile'
import Preferences from '@/components/profilePreference'
import GeneticsSport from '@/components/profileGenetics/profileGeneticsSport'
import GeneticsDiet from '@/components/profileGenetics/profileGeneticsDiet'
import Goals from '@/components/profileGoals'
import Experience from '@/components/profileExperience'
import Diet from '@/components/profileDiet'






Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	{
		path: '/',
		name: 'Hello',
		component: Hello
	},
	{
		path: '/program',
		name: 'Program',
        // meta: {auth: true},
		component: Program
	},
	{
		path: '/progress',
		name: 'Progress',
        // meta: {auth: true},
		component: Progress
	},
	{
		path: '/diary',
		name: 'Diary',
        // meta: {auth: true},
		component: Diary
	},
	{
		path: '/fooddiary',
		name: 'Fooddiary',
        // meta: {auth: true},
		component: Fooddiary
	},
	{
		path: '/labtests',
		name: 'Labtests',
        // meta: {auth: true},
		component: Labtests
	},
	{
		path: '/menu',
		name: 'Menu',
        // meta: {auth: true},
		component: Menu
	},
    {
        path: '/registration',
        name: 'Registration',
        meta: {
            auth: false,
            redirect: '/diary',
            forbiddenRedirect: '/diary/403'
            
        },
        component: Registration
    },
    {
        path: '/about',
        name: 'About',
        // meta: {auth: true},
        component: About
    },
    {
        path: '/profile',
        name: 'Profile',
        // meta: {auth: true},
        component: Profile
    },
    {
        path: '/profile/preferences',
        name: 'Preferences',
        // meta: {auth: true},
        component: Preferences
    },
    {
        path: '/profile/genetics/sport',
        name: 'GeneticsSport',
        // meta: {auth: true},
        component: GeneticsSport
    },
    {
        path: '/profile/genetics/diet',
        name: 'GeneticsDiet',
        // meta: {auth: true},
        component: GeneticsDiet
    },
    {
        path: '/profile/goals',
        name: 'Goals',
        // meta: {auth: true},
        component: Goals
    },
    {
        path: '/profile/experience',
        name: 'Experience',
        // meta: {auth: true},
        component: Experience
    },
    {
        path: '/profile/diet',
        name: 'Diet',
        // meta: {auth: true},
        component: Diet
    }
    // ,
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    //   meta: {auth: false}
    // }
    // , {
    //   path: '/login/:type',
    //   name: 'oauth2-type',
    //   component: require('./pages/Oauth2.vue')
    // }, {
    //   path: '/register',
    //   name: 'register',
    //   component: require('./pages/Register.vue'),
    //   meta: {auth: false}
    // },
    //   path: '/async',
    //   name: 'async',
    //   component: function(resolve) { require(['./pages/Async.vue'], resolve); }
    // }, {
    //   path: '/admin',
    //   name: 'admin',
    //   component: require('./pages/Admin.vue'),
    //   meta: {auth: {roles: 'admin', redirect: {name: 'login'}, forbiddenRedirect: '/403'}},
    //   children: [{
    //     path: 'products',
    //     name: 'admin-products',
    //     component: require('./pages/admin/Products.vue'),
    //     children: [{
    //       path: ':product_id',
    //       name: 'admin-product',
    //       component: require('./pages/admin/Product.vue'),
    //       children: [{
    //         path: 'info',
    //         name: 'admin-product-info',
    //         component: require('./pages/admin/ProductInfo.vue'),
    //         meta: {auth: undefined}
    //       }, {
    //         path: 'media',
    //         name: 'admin-product-media',
    //         component: require('./pages/admin/ProductMedia.vue')
    //       }]
    //     }]
    //   }]
    // }, {
    //   path: '/users',
    //   name: 'users',
    //   component: require('./pages/Users.vue'),
    //   meta: {auth: ['admin']}
    // }
	]
})



