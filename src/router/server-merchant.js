import seatCreate from '@/components/server/merchant/seat/index'
export default function(routes){
  routes.push({
    path: '/server/merchant/seat/index',
    name: 'server-merchant-seat-index',
    component: seatCreate
  });
}
