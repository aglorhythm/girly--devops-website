'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { sanitize } from "isomorphic-dompurify";
import {Image} from "@nextui-org/react";


const Hero = React.memo(({ }) => {

    const router = useRouter();
    const [item, setItem] = useState(null);
    const logoUrl = `https://res.cloudinary.com/dhugrtkns/image/upload/v1717656973/Girlysheet_m9bi41.png`
    const iconUrl = `https://res.cloudinary.com/dhugrtkns/image/upload/v1717662432/devops_cloud_girlysheet_q5ziji.png`

    return (

        <div className="hero-section sm:grid sm:grid-rows-4 flex justify-center items-center bg-white mx-auto sm:h-full sm:min-h-[100vh]  sm:max-h-[100vh] min-h-[95vh]">
           <div className={`flex flex-col justify-center items-center `}>
                <Image
                    width={700}
                    alt="Girlysheet logo"
                    src={logoUrl}
                />
                <Image
                    width={300}
                    alt="Girlysheet logo"
                    src={iconUrl}
                />
                <br></br>
                <p className={`font-code-game`}>Coming Soon...</p>
           </div>

        </div>
    )
})

export default Hero