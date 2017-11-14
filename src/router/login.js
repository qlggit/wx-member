import loginPhone from '@/components/login/phone'
import loginInfo from '@/components/login/info'
export default function(routes){
  routes.push({
    path: '/login/phone',
    name: 'login-phone',
    component: loginPhone
  });
  routes.push({
    path: '/login/info',
    name: 'login-info',
    component: loginInfo
  });
}
