// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VResource from 'vue-resource';
import VRouter from 'vue-router';

import topology from './components/topology/topology.vue';
import view from './components/business/view.vue';
import create from './components/business/create.vue';
import panel from './components/panel/panel.vue';
import rout from './components/rout/rout.vue';
import xn from './components/xn/xn.vue';
import step1 from './components/step/step1.vue';
import step2 from './components/step/step2.vue';
import step3 from './components/step/step3.vue';
import step4 from './components/step/step4.vue';

Vue.config.productionTip = false

Vue.use(VRouter);
Vue.use(VResource);

const router = new VRouter({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: topology
		},
		{
			path: '/topology/',
			component: topology,
			children: [
				{
					path: 'panel/:id',
					component: panel
				}
			]
		},
		{
			path: '/business/view',
			component: view
		},
		{
			path: '/business/view/:yw',
			component: view,
			children: [
				{
					path: 'rout',
					component: rout
				},
				{
					path: 'xn',
					component: xn
				}
			]
		},
		{
			path: '/business/create',
			component: create
		},
		{
			path: '/business/create/step1',
			component: step1
		},
		{
			path: '/business/create/step2',
			component: step2
		},
		{
			path: '/business/create/step3',
			component: step3
		},
		{
			path: '/business/create/step4',
			component: step4
		}
	]
});

new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app');
