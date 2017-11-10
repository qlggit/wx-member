import Vue from 'vue'

import toast from '@/components/window/toast.vue'
import loading from '@/components/window/loading.vue'
import share from '@/components/window/share.vue'
import window from '@/components/common/window'

import footerComponent from '@/components/common/footer.vue'
import headerComponent from '@/components/common/header.vue'

import citySelect from '@/components/common/city-select.vue'
import cityLocation from '@/components/common/city-location.vue'
import swiper from '@/components/common/swiper'
import marquee from '@/components/common/marquee'
import star from '@/components/common/star'
import buyButton from '@/components/common/buy-button'

import clubSearch from '@/components/common/club-search'
import numberSelect from '@/components/common/number-select'

Vue.component('footer-component',footerComponent);
Vue.component('header-component',headerComponent);

Vue.component('city-select',citySelect);
Vue.component('city-location',cityLocation);
Vue.component('wy-swiper',swiper);
Vue.component('wy-marquee',marquee);
Vue.component('wy-star',star);
Vue.component('wy-buy-button',buyButton);
Vue.component('wy-club-search',clubSearch);
Vue.component('wy-number-select',numberSelect);

Vue.component('wy-window',window);
Vue.component('wy-toast',toast);
Vue.component('wy-loading',loading);
Vue.component('wy-share',share);
