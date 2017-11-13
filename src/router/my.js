import myIndex from '@/components/my/index'
import myWine from '@/components/my/wine'
import myOrder from '@/components/my/order'
import mySeat from '@/components/my/seat'
export default function(routes){
  routes.push({
    path: '/my',
    name: 'my-index',
    component: myIndex
  });
  routes.push({
    path: '/my/wine',
    name: 'my-wine',
    component: myWine
  });
  routes.push({
    path: '/my/order',
    name: 'my-order',
    component: myOrder
  });
  routes.push({
    path: '/my/seat',
    name: 'my-seat',
    component: mySeat
  });
}
