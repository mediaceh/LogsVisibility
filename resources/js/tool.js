import Select from 'ant-design-vue/es/select';
import Checkbox from 'ant-design-vue/es/checkbox';
import storeModule from "./storeModule";
import {VUEX_NAMESPACE} from "./consts";

Nova.booting((Vue, router, store) => {
  Vue.use(Select);
  Vue.use(Checkbox);
  store.registerModule(VUEX_NAMESPACE, storeModule)
  router.addRoutes([
    {
      name: 'logs-visibility',
      path: '/logs-visibility',
      component: require('./components/Tool'),
    },
  ])
})
