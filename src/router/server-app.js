import book from '@/components/merchant/book'
import product from '@/components/merchant/product'
import pay from '@/components/merchant/pay'
import complete from '@/components/merchant/pay-complete'
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
    path: '/server/app/complete',
    name: 'server-app-complete',
    component: complete
  });
}
