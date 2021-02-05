import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/login/login'
import control from '@/pages/directory/control.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'login'}
    }, {
      path: '/login',
      name: 'login',
      component:resolve => require(['@/pages/login/login'], resolve),
    }, {
      path: '/logout',
      name: 'logout',
      beforeEnter(to, from, next) {
        localStorage.clear();
        next({name: 'login'})
      }
    }, {
      path: '/select',
      name: 'select',
      component:resolve => require(['@/pages/selectBranch/selectBranchcontrol'], resolve),
      children:[
        // {
        //   path:'control',
        //   name:'controlentirety',
        //   component:resolve => require(['@/pages/directory/control.vue'], resolve),
        // },
        {
          path:"count",
          name:'countentirety',
          component:resolve => require(['@/pages/directory/count.vue'], resolve),
     
        },{
          path:"vote",
          name:'voteentirety',
          component:resolve => require(['@/pages/directory/vote.vue'], resolve),
        },{
          path:'offNetwork',
          name:'offNetworkentirety',
          component:resolve => require(['@/pages/directory/offNetwork.vue'], resolve),
        },
        // {
        //   path: 'specifics/control',
        //   name: 'scontrol',
        //   component:resolve => require(['@/pages/specifics/control.vue'], resolve),
        //   meta: {
        //     requiresAuth: true
        //   }
        // },
        {
          path: 'specifics/count',
          name: 'scount',
          // component: scount,
          component:resolve => require(['@/pages/specifics/count.vue'], resolve),
         
          meta: {
            requiresAuth: true
          }
        },{
          path: 'specifics/vote',
          name: 'svote',
          component:resolve => require(['@/pages/specifics/vote.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },{
          path:'specifics/offNetwork',
          name:'soffNetwork',
          component:resolve => require(['@/pages/specifics/offNetwork.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },{
      path: '/systemControl',
      name: 'systemControl',
      component:resolve => require(['@/pages/selectBranch/selectSystemControl'], resolve),
      children:[
        {
          path:'control',
          name:'controlentirety',
          component:resolve => require(['@/pages/directory/control.vue'], resolve),
        },{
          path: 'specifics/control',
          name: 'scontrol',
          component:resolve => require(['@/pages/specifics/control.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },{
          path: 'spersonnel',
          name: 'personnel',
          component:resolve => require(['@/pages/directory/personnel.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },{
          path: 'dpersonnel',
          name: 'personnel3',
          component:resolve => require(['@/pages/directory/personnel3.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },{
      path: '/departmentControl',
      name: 'departmentControl',
      component:resolve => require(['@/pages/selectBranch/selectDepartmentControl'], resolve),
      children:[
        {
          path:'control',
          name:'controlentirety',
          component:resolve => require(['@/pages/directory/dcontrol.vue'], resolve),
        },{
          path: 'specifics/control',
          name: 'scontrol2',
          component:resolve => require(['@/pages/specifics/control.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },{
          path: 'personnel',
          name: 'personnel',
          component:resolve => require(['@/pages/directory/personnel2.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
   
   
  ]
})



export default router
