import Vue from 'vue'

import toast from '@/components/window/toast.vue'
import loading from '@/components/window/loading.vue'
import share from '@/components/window/share.vue'

import footerComponent from '@/components/common/footer.vue'
import headerComponent from '@/components/common/header.vue'
import citySelect from '@/components/common/city-select.vue'

import swiper from '@/components/common/swiper'

Vue.component('footer-component',footerComponent);
Vue.component('header-component',headerComponent);
Vue.component('city-select',citySelect);
Vue.component('wy-swiper',swiper);
Vue.component('wy-toast',toast);
Vue.component('wy-loading',loading);
Vue.component('wy-share',share);
