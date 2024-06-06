'use client';
import React from "react";
import {
    aboutPage,
    shippingPage,
    contactPage,
    termsPage,
    privacyPage,
} from '/components/Utils/pageUrls';

import { Card, CardBody, CardHeader, CardFooter, Image, Link, Button } from "@nextui-org/react";
import { MdArrowOutward } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Footer({ params, dict }) {


    return (
        <div className={`bg-black `}>
            <div className={`flex flex-col justify-center items-center pt-20`}>
                <div className={`sm:max-w-[260px] max-w-[400px] text-center`}>
                <span className={`text-white text-bold text-2xl sm:text-lg`}>
                {
                    params.lang == 'fr' ? 'Reçois les stories et les nouveautés directement dans ta boîte mail' : 'Receive stories and news directly in your email inbox'
                }
                </span>
                </div>
                <div>
            <iframe className={'overflow-hidden'} width={540} height={305} src="https://6d3ae8a9.sibforms.com/serve/MUIFACmViIJiGaeL8gMjwvy0KrbMrM08NgyKIbOYQfgn6pMH-uO5eg1Wi-I_aNNe_FMKouzUC-cdlnWdHNq_xQiyOOPlZQbHckigwJojstguyRAq6V_SkgX0wpIknoeY3pJ2qi9sEcyvD-45haDAn7d_uR6rhbrg5Fvr6-BwwEcR0UviHkj8nMPtLg2yffZyvoq5l6k6xw_Ooedw" frameBorder={0} scrolling="auto" allowFullScreen style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%'}} />
            </div>
            </div>
            <div className="flex  justify-center  items-center product-section mx-auto min-h-[80vh] bg-gradient-to-b from-black via-rose-400 from-[25%] to-rose-300 p-5">

                <div className='flex flex-1 sm:flex-col justify-center items-center my-5 max-w-[80vw] my-20'>
                   
                </div>

            </div>
        </div>
    )
}

export default Footer