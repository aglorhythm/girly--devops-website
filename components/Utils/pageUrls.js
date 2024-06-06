import Link from 'next/link';


import { GrLanguage } from 'react-icons/gr';


// Image Urls - to use with Next Image
export const fromImageToUrl = (image) =>{

    let url
    const IMAGES_DOMAIN  = publicRuntimeConfig.IMAGES_DOMAIN

    if(!image){
        url = "/vercel.svg"
    }
    if (image && image.url && image.url.startsWith("/")){
        url = `${IMAGES_DOMAIN}${image && image.url}`
    }else{
        url = image && image.url
    }

    return url
}

export const LanguageSettings = ({router}) => {

    return (
        (<Link
            href={router.asPath}
            locale={router.locale === 'fr' ? 'en' : 'fr'}
            className="translate-button">

            <GrLanguage className="language-icon"/>
            {
                router.locale === 'en' ? ' EN voir le site en français' : ' FR See english site'
            }

        </Link>)
    );
    
    
}



/*****Page urls *****/

export const noUrl = '/#';
export const homePage = '/';


//Blog
export const blogPage =  `/stories`; 

//Collection
export const collectionPage =  `/collections`;
export const favoritesPage =  `/collections/favorites`; 

//pages
export const aboutPage =  {
    fr: `/pages/a-propos`,
    en: `/pages/about`,
}; 
export const contactPage = {
    fr: `/pages/contact`,
    en: `/pages/contact`,
}; 
export const shippingPage = {
    fr: `/pages/livraison`,
    en: `/pages/shipping`,
}; 
export const termsPage = { 
    fr: `/pages/conditions-generales-de-vente`,
    en: `/pages/terms-and-conditions`,
}; 
export const privacyPage =  {
    fr: `/pages/politique-confidentialite`,
    en: `/pages/privacy-policy`,
}; 

//Pages



// Cloudinary images
/*
export const url = buildUrl(image, {
    cloud: {
        cloudName: CLOUDINARY_NAME,
    },
})*/



