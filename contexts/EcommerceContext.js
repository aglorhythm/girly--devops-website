//Required
'use client'
import { createContext, useState, useEffect } from 'react';
import {
    createLocalCart,
    addCartItem,
    removeFromCart ,
    emptyCart,
    decreaseCartItem,
    createAccount,
    sendMessage,
    createNewCheckoutSession
} from './CommerceServices';
//import { loadStripe } from '@stripe/stripe-js';
//import _ from 'lodash';
import * as ga from '../lib/ga/index.js';


//const stripePromise = loadStripe(process.env.STRIPE_PK);


import { setCookie, parseCookies, destroyCookie } from 'nookies';


const EcommerceContext = createContext();

export const EcommerceProvider = (props) => {
    

    // Get authentified user's token
    const getToken = async (ctx) => {
        try{
            const jwt = parseCookies(ctx).jwt
            return jwt
        } catch (err) {
        }
    }

    // Get authentified user's payment intent
    const getPaymentIntentId = async (ctx) => {
        try{
            const paymentIntentId = parseCookies(ctx).paymentIntentId
            return paymentIntentId
        } catch (err) {
        }
    }

    // Define items array
    const [cart, setCart] = useState();
    const [cartTotal, setCartTotal] = useState();
    const [token, setToken] = useState();
    const [favoriteItems, setFavoriteItems] = useState([]); //updates user favorites - user current fav ?
    const [addedFav, setAddedFav] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonProcessing, setButtonProcessing] = useState(false);
    const [error, setError] = useState(false);
    const [alreadyCustomer, setAlreadyCustomer] = useState(false);
    const [errorBeforePayment, setErrorBeforePayment] = useState(null);
    const [paymentIntent, setPaymentIntent] = useState('');
    const [dataSent, setDataSent] = useState(false)
    const [fieldMissing, setFieldMissing] = useState(false)
    

    //Set up user cart
    useEffect(() => {
        const fetchData = async () => {
          try {

            //console.log('set up cart...')
                const initialisedCart = await createLocalCart();
                if(initialisedCart) setCart(initialisedCart);

          } catch (error) {
            // Handle any errors that occurred during the data fetching process
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);
    
    
    //Update cart and save to storage
    /*useEffect(() => {
        const fetchData = async () => {
            //console.log('setCart update:', cart)

            if(process.browser){
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        };
      
        fetchData();
      },[cart]);*/

 

    // Adds product to user's cart
    async function handleAddItem(product) {
        if(buttonProcessing === true){ 
            return
        }else{
            setButtonProcessing(true);
            const addToCart = await addCartItem(cart, product);
            //record event to GA
      
                ga && ga.event({
                    action: 'add_to_cart',
                    category: 'Ecommerce',
                    label: 'User adds to cart',
                    value: product.price,
                    currency: "EUR",
                    items: [{
                        item_id: product.id,
                        item_name: product.name,
                        currency: "EUR",
                        price: product.price,
                        quantity: 1
                    }]
                })
            addToCart && setButtonProcessing(false)
        }
        
    }


    // Adds product to user's cart
    async function handleDecreaseItem(product) {
        if(buttonProcessing === true){ 
            return
        }else{
            setButtonProcessing(true);
            const decreaseItem = await decreaseCartItem(cart, product.id);
            decreaseItem && setButtonProcessing(false)
        }
    }

    // Removes item from cart
    async function handleDeleteItem(product) {
        if(buttonProcessing === true){ 
            return
        }else{
            setButtonProcessing(true);
            const removeItem = await removeFromCart(cart, product.id);
            removeItem && setButtonProcessing(false)
        }
    }

    // Removes items from cart
    async function handleEmptyCart() {
        if(buttonProcessing === true){ 
            return
        }else{
            setButtonProcessing(true);
            const emptyUserCart = await emptyCart();
            emptyUserCart && setButtonProcessing(false)
        }
    }
   
    async function handleOrder(cart){
        if(buttonProcessing === true){ 
            return
        }else{
            
            const orderItems = cart && cart.items.length > 0 && await createNewCheckoutSession(cart);
            
            if(orderItems.session_created.url && orderItems.session_created.url != undefined ){
                window.location.assign(orderItems.session_created.url);
            }
            
        }
    }

    async function handleSendMessage(data){
        setFieldMissing(false);
        if(!data.message || !data.email || !data.subject){
            setFieldMissing(true);
            return
        }
        setDataSent(false);
        
        //Send message if all data is here
        const sendNewMessage = await sendMessage(data);
        //const res = await sendNewMessage.json()
        if (sendNewMessage.responseData.success) {
            setDataSent(true);
            return res
        }
        
    }

    /***** AUTHENTICATION *****/

    async function handleCreateAccount(data){
        setFieldMissing(false);
        if(!data.firstname || !data.lastname || !data.email || !data.password){
            setFieldMissing(true);
            return
        }
        
        //Send message if all data is here
        const createNewAccount = await createAccount(data);
        const res = await createNewAccount.json()
        if (res && res.responseData.success) {
            return res
        }
    }

    return (
    <EcommerceContext.Provider value={{ 
        getPaymentIntentId,
        loading,
        setLoading,
        handleOrder,
        handleAddItem,
        handleDecreaseItem,
        handleDeleteItem,
        buttonProcessing,
        setButtonProcessing,
        dataSent,
        setDataSent,
        //handleCartStripeSession,
        handleSendMessage,
        error,
        setError,
        alreadyCustomer,
        cart,
        setCart,
        cartTotal,
        handleEmptyCart,
        setErrorBeforePayment,
        errorBeforePayment,
        setPaymentIntent,
        paymentIntent,
        token, 
        fieldMissing,
        handleCreateAccount
        //stripePromise
    }}>
      {props.children}
    </EcommerceContext.Provider>
  );
};




export default EcommerceContext