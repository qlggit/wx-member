import spread from '@/components/server/qrcode/spread'
export default function(routes){
  routes.push({
    path: '/server/qrcode/spread',
    name: 'server-qrcode-spread',
    component: spread
  });
}
