//const stripe = require('stripe')(process.env.STRIPE_SK);
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const consumerKey = process.env.WC_CLIENT_KEY;
const consumerSecret = process.env.WC_SK;
const publicApiUrl = process.env.API_URL_PUBLIC;
import { sanitize } from "isomorphic-dompurify";
import {
    createOrder
  } from '/lib/apis';
const FRONT_END_API = process.env.FRONT_END_API;
const API_URL = process.env.API_URL;

const api = new WooCommerceRestApi({
    url: publicApiUrl,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: "wc/v3"
});


export async function newCheckout(cart) {
    
    //const body = await request.json();
    //const cart = body;
    const allowed_countries = [
        'FR',
        'GB', 
        'BE', 
        'CH',
        'DE',
        'IT',
        'ES',
        'NL',
        'LU'
    ]

    //test
    const line_items = [{
        price: 'price_1OYXsTJ9mQ6Nw6S1kRAdoMqA',
        quantity: 4
    }] //price_1OYXsTJ9mQ6Nw6S1kRAdoMqA 
    const session_created = {
        success: false,
        url: undefined,
        message: undefined
    }

    if(!cart || cart.items.length == 0){
        session_created.messahe = 'no cart'
        return Response.json({ session_created })
    }

   try {
    
        //First create An Order so we can track it event if i's not paid (act as a cart)- useless
        const createAnOrder = await createOrder(cart);
        //const orderCreated = await createAnOrder.json();
        const newOrder = createAnOrder.responseData;

        //Create a session
        if(line_items.length > 0){
            const orderCustomIdObject = newOrder.order.meta_data.find(item => item.key === 'order_custom_id');
            const orderCustomIdValue = orderCustomIdObject ? orderCustomIdObject.value : null;

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                success_url: `https://signedmonyka.com/confirm?success=true&orderId=${orderCustomIdValue}`,
                cancel_url: `https://signedmonyka.com/?canceled=true`,
                metadata: {
                    order_attached_id: newOrder.order.id,
                    order_attached_custom_id: orderCustomIdValue
                },
                shipping_address_collection: {
                    allowed_countries
                },
                invoice_creation: {
                    enabled: true
                }
            });

            //Save checkout session to order
            const updateOrder = await api.post(
                `orders/${newOrder.order.id}`,
                {
                    meta_data : [
                        ...newOrder.order.meta_data,
                        {
                            key: 'checkout_session',
                            value: session.id
                        }
                    ]
                }
            );

            session_created.success = true;
            session_created.url = session.url;
        }
    } catch (err) {
        //console.log('err:', err)
    }
    return Response.json({ session_created });
}