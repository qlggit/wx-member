import seatCreate from '@/components/server/admin/seat/create'
export default function(routes){
  routes.push({
    path: '/server/admin/seat/create',
    name: 'server-seat-create',
    component: seatCreate
  });
}
