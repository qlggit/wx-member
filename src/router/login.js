import loginPhone from '@/components/login/phone'
export default function(routes){
  routes.push({
    path: '/login/phone',
    name: 'login-phone',
    component: loginPhone
  });
}
