'use client'
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

import { inclusiveSans, junction, fanwood, lunasima } from '/components/Utils/fonts';

//Contexts
import { breakpoints } from '/components/Utils/Parameters';
import BreakPointContext from '/contexts/BreakPointContext';
import { MenuTrigger } from '/components/Menu/MenuTrigger';

//Styles
import { GiSofa } from "react-icons/gi";


const theme = {
    isDark: {
        text: 'text-zinc-50',
        bg: 'bg-black',
        bg2: 'bg-prestige-950'
    },
    isLight: {
        text: 'text-prestige-50',
        bg: 'bg-love-50'
    },
}

function Header({params, dict}) {
    const router = useRouter();
    const pathname = usePathname()
    const { isBreakpoint } = useContext(BreakPointContext);
    const isArticlePage = pathname.startsWith('/stories');
    const navLinks = [
        {
            title: 'Home',
            url: '/'
        },
    ]

    function DesktopMenu() {
        const menu = navLinks


        return (
            <>
            
                <NavbarContent className="hidden flex gap-10 " justify="center">

                </NavbarContent>
            </>
        )
    }

    function MobileMenu() {
        return (
            <>
                <NavbarContent className="hidden flex gap-4" justify="center">
                </NavbarContent>

            </>
        )
    }


    // Check if the current page is an article page

    return (
        <Navbar shouldHideOnScroll={isBreakpoint ? true : false} className={`header min-h-[8vh] z-50 ${isArticlePage ? theme.isDark.text : theme.isLight.text} ${isArticlePage ? theme.isDark.bg : theme.isLight.bg}`} >
     
            {
                isBreakpoint ? <MobileMenu /> : <DesktopMenu />
            }
        </Navbar>

    )
}

export default Header

