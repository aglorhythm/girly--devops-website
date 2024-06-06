const API_URL = process.env.API_URL;
const FRONT_END_API = process.env.FRONT_END_API;
import { confirmNewOrder } from 'lib/apis/confirmOrder.js'
import { newCheckout } from 'lib/apis/createCheckout.js'

//Internal apis fetching logic
export const fetchPublicAPI = async (api) => {

    //console.log('api:', api)
    try{
        const result = await fetch(`${FRONT_END_API}${api}`, { next: { revalidate: 3600 * 24 * 7 } }).then(res => res.json());
        if (!result) {
            throw new Error(`Failed to fetch data: ${result.status}`);
        }
        //console.log('result:', result)
        return result
       
    }catch(err){
        //console.log('err:', err)
    }    
}

export const postPublicAPI = async (api, body) => {
    
    try{
        const result = await fetch(`${FRONT_END_API}${api}`, {   
            method: 'POST',
            body: JSON.stringify(body)
        }).then(res => res.json());

        if (!result) {
            throw new Error(`Failed to fetch data: ${result.status}`);
        }
        //console.log('result:', result)
        return result
       
    }catch(err){
        //console.log('err:', err)
    }    
}

/**
 * Fetch Private api
 * @param {*} api 
 * @returns 
 */
export const fetchWpAPI = async (api) => {
    //console.log('wp api:', `${API_URL}${api}`);
    const result = await fetch(`${API_URL}${api}`, { next: { revalidate: 3600 * 24 * 7} }).then(res => res.json());
    //console.log('result:', result);
    return result
}

// APIs
export const enTranslation = 'locale=en'

export const getPages = (queries) => fetchWpAPI(`/pages?${queries}`);
export const getSinglePagePublic = (queries) =>  fetchPublicAPI(`/get-page?${queries}`)
export const getPagesPublic = (queries) => fetchPublicAPI(`/get-pages?${queries}`)


//Blog
export const getArticles = (queries) => fetchWpAPI(`/posts?${queries}`);
export const getSingleArticle = (slug) => fetchWpAPI(`/posts?slug=${slug}`);
export const getSingleArticlePublic = (queries) => fetchPublicAPI(`/get-article?${queries}`)
export const getLastArticlesPublic = (queries) => fetchPublicAPI(`/get-last-articles?${queries}`)
export const getMedias = (id) => fetchWpAPI(`/media/${id}`)
export const getBlogCategories = (queries) => fetchWpAPI(`/categories${queries}`)
export const getBlogCategoriesPublic = () => fetchPublicAPI(`/get-categories`)


//WC Products
export const getProductPublic = (queries) => fetchPublicAPI(`/get-product?${queries}`)
export const getLastProductsPublic = (queries) => fetchPublicAPI(`/get-last-products?${queries}`)
export const getProductsCategoriesPublic = () => fetchPublicAPI(`/get-product-categories`)

//Account
export const createOrder = (body) => postPublicAPI(`/create-order`, body)
export const createCheckoutSession = (cart) => newCheckout(cart)
export const createUser = (body) => postPublicAPI(`/create-account`, body)
export const confirmOrder = (orderId, success) => confirmNewOrder(orderId, success)
export const loginUser = () => fetchPublicAPI(`/login-user`)
export const retrieveUser = () => fetchPublicAPI(`/retrieve-user`)

//Contact
export const contactUs = (body) => postPublicAPI('/contact', body)