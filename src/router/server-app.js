import book from '@/components/merchant/book'
import product from '@/components/merchant/product'
import pay from '@/components/merchant/pay'
import complete from '@/components/merchant/pay-complete'
import detail from '@/components/merchant/detail'

import messageList from '@/components/server/message/list'
import messageDetail from '@/components/server/message/detail'
export default function(routes){
  routes.push({
    path: '/server/app/book',
    name: 'server-app-book',
    component: book
  });
  routes.push({
    path: '/server/app/product',
    name: 'server-app-product',
    component: product
  });
  routes.push({
    path: '/server/app/pay',
    name: 'server-app-pay',
    component: pay
  });
  routes.push({
    path: '/server/app/pay-complete',
    name: 'server-app-pay-complete',
    component: complete
  });
  routes.push({
    path: '/server/app/merchant',
    name: 'server-app-merchant',
    component: detail
  });
  routes.push({
    path: '/server/app/message/list',
    name: 'server-app-message-list',
    component: messageList
  });
  routes.push({
    path: '/server/app/message/detail',
    name: 'server-app-message-detail',
    component: messageDetail
  });
}
