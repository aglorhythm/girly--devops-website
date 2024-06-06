import localFont from 'next/font/local';

export const junction = localFont({
    src: [
     {
      path: '../../public/fonts/Junction-bold.otf',
      style: 'bold'
    },
    {
      path: '../../public/fonts/Junction-light.otf',
      style : 'light'
    },
     {
      path: '../../public/fonts/Junction-regular.otf',
      style: 'normal'
    }
    ],
    variable: '--font-junction'
})

export const inclusiveSans = localFont({
    src: '../../public/fonts/inclusivesans-regular.otf',
    variable: '--font-inclusive',
    display: 'swap',
})

export const fanwood = localFont({
  src: [
    {
     path: '../../public/fonts/Fanwood.otf',
     style: 'normal'
   },
   /*{
     path: '../../public/fonts/Fanwood-italic.otf',
     style : 'bold'
   },
    {
     path: '../../public/fonts/Fanwood-Text-italic.otf',
     style: 'normal'
   }*/
   ],
   variable: '--font-fanwood'
})

export const lunasima = localFont({
  src: [
    {
     path: '../../public/fonts/lunasima-bold.ttf',
     style: 'bold'
   },
   {
     path: '../../public/fonts/lunasima-regular.ttf',
     style : 'normal'
   },
    /*{
     path: '../../public/fonts/Fanwood-Text-italic.otf',
     style: 'normal'
   }*/
   ],
   variable: '--font-fanwood'
})
  