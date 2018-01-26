import Vue from 'vue'

import toast from '@/components/window/toast.vue'
import loading from '@/components/window/loading.vue'
import share from '@/components/window/share.vue'
import window from '@/components/common/window'
import confirm from '@/components/window/confirm'
import message from '@/components/window/message'

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


import otherInfo from '@/components/common/other-info'
import date from '@/components/common/date'
import showSvg from '@/components/common/show-svg'
import makeSvg from '@/components/common/make-svg'

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

Vue.component('wy-other-info',otherInfo);
Vue.component('wy-date',date);
Vue.component('wy-show-svg',showSvg);
Vue.component('wy-make-svg',makeSvg);

Vue.component('wy-window',window);
Vue.component('wy-toast',toast);
Vue.component('wy-loading',loading);
Vue.component('wy-share',share);
Vue.component('wy-confirm',confirm);
Vue.component('wy-message',message);

import picker from 'vue-3d-picker';
Vue.component('picker', picker);
