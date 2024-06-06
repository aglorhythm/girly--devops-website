'use client'
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';


//Styles
import { NavbarItem, Link, Button } from "@nextui-org/react";
import { RiMenuSearchLine } from "react-icons/ri";
import { GiSofa } from "react-icons/gi";

const showCart = () => { }

export function MenuTrigger({items, theme, isArticlePage, router, inclusiveSans, params}) {


  /**Cart Drawer State */
  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  /*** Items ***/
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
          {
            items.map((item, index) => 
                <NavbarItem key={index} className={`flex-col mx-10 my-10 justify-center items-center`}>
                    <Link className={`${isArticlePage ? theme.isDark.text : theme.isLight.text} ${inclusiveSans.className} text-xl text-love-400 font-bold`} href={`/${params.lang}${item.url}`} >
                        {item.title}
                    </Link>
                </NavbarItem>

            )
          }
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={`flex items-center`}>
            <Button
              isIconOnly
              aria-label="Cart"
              className={`bg-transparent text-love-400 text-3xl`}
              radius='full'
              size='lg'
              onPress={toggleDrawer(anchor, true)}
            >
              <RiMenuSearchLine />
            </Button>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}

          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}