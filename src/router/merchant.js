import merchantDetail from '@/components/merchant/detail'
import merchantBook from '@/components/merchant/book'
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
}
