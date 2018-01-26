import wineManner from '@/components/h5/wine-manner'
import wineMannerRes from '@/components/h5/wine-manner-res'
import h5Test from '@/components/h5/test'
export default function(routes){
  routes.push({
    path: '/h5/wine-manner',
    name: 'h5-wine-manner',
    component: wineManner
  });
  routes.push({
    path: '/h5/wine-manner-res',
    name: 'h5-wine-manner-res',
    component: wineMannerRes
  });
  routes.push({
    path: '/h5/test',
    name: 'h5-test',
    component: h5Test
  });
}
