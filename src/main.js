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

Vue.config.productionTip = false

Vue.use(VRouter);
Vue.use(VResource);

const router = new VRouter({
	linkActiveClass: 'active',
	routes: [
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
			path: '/business/create',
			component: create
		}
	]
});

new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app');
