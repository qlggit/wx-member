import myIndex from '@/components/my/index'
import myWine from '@/components/my/wine'
import myOrder from '@/components/my/order'
import mySeat from '@/components/my/seat'
import myInfo from '@/components/my/info'
import myQrcode from '@/components/my/qrcode'
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
  routes.push({
    path: '/my/info',
    name: 'my-info',
    component: myInfo
  });
  routes.push({
    path: '/my/qrcode',
    name: 'my-info',
    component: myQrcode
  });
}
