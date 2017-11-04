import Vue from 'vue'

import toast from '@/components/window/toast.vue'
import loading from '@/components/window/loading.vue'
import share from '@/components/window/share.vue'

import footerComponent from '@/components/common/footer.vue'
import headerComponent from '@/components/common/header.vue'

Vue.component('footer-component',footerComponent);
Vue.component('header-component',headerComponent);
Vue.component('wy-toast',toast);
Vue.component('wy-loading',loading);
Vue.component('wy-share',share);
