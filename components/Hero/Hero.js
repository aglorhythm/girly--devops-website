'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { sanitize } from "isomorphic-dompurify";

//Styles
import { Image } from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import { FaGithubAlt } from "react-icons/fa";



const Hero = React.memo(({ }) => {

    const router = useRouter();
    const [item, setItem] = useState(null);
    const logoUrl = `https://res.cloudinary.com/dhugrtkns/image/upload/v1717656973/Girlysheet_m9bi41.png`
    const iconUrl = `https://res.cloudinary.com/dhugrtkns/image/upload/v1717662432/devops_cloud_girlysheet_q5ziji.png`
    const bgVideo = `https://res.cloudinary.com/dhugrtkns/video/upload/v1718131397/855507-hd_1920_1080_25fps_1_wjausk.mp4`
    return (

        <div className="hero-section relative w-screen h-screen sm:grid flex justify-center items-center h-[100vh] w-[100vw] mx-auto sm:h-full sm:min-h-[100vh]  sm:max-h-[100vh] min-h-[95vh]">
            <div className={`flex flex-col justify-center items-center z-20 mx-50 h-full `}>
                <Image
                    alt="Girlysheet logo"
                    src={logoUrl}
                    className={`logo max-w-[700px] md:max-w-[500px] sm:max-w-[300px]`}
                />
                <Image
                    width={300}
                    alt="Devops sticker"
                    src={iconUrl}
                    className={`devops-sticker max-w-[300px] md:max-w-[300px] sm:max-w-[200px]`}
                />
                <br></br>
                <p className={`font-code-game text-center`}>Coming Soon... with a DevOps mindset.</p>
                <br></br>
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/aglorhythm"
                    anchorIcon={<FaGithubAlt  />}
                >
                    <p className={`font-code-game text-xs cursor-pointer`}>aglorhythm</p>
                </Link>
                
            </div>
            <div className={`overlay flex bg-white absolute w-full h-full z-10 opacity-85`}></div>
            <video
                src={bgVideo}
                autoPlay
                muted
                loop
                className={`bg-video absolute top-0 left-0 z-5 max-h-full min-h-full min-w-full object-cover md:object-cover md:h-full`}
            />
        </div>
    )
})

export default Hero