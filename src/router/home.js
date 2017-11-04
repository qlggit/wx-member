import homeIndex from '@/components/home/index'
export default function(routes){
  routes.push({
    path: '/',
    name: 'home-index',
    component: homeIndex
  });
}
