import merchantDetail from '@/components/merchant/detail'
import merchantBook from '@/components/merchant/book'
import merchantProduct from '@/components/merchant/product'
import merchantPay from '@/components/merchant/pay'
export default function(routes){
  routes.push({
    path: '/merchant/detail',
    name: 'merchant-detail',
    component: merchantDetail
  });
  routes.push({
    path: '/merchant/book',
    name: 'merchant-book',
    component: merchantBook
  });
  routes.push({
    path: '/merchant/product',
    name: 'merchant-product',
    component: merchantProduct
  });
  routes.push({
    path: '/merchant/pay',
    name: 'merchant-pay',
    component: merchantPay
  });
}
