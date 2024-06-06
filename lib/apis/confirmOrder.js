//const stripe = require('stripe')(process.env.STRIPE_SK);
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const consumerKey = process.env.WC_CLIENT_KEY;
const consumerSecret = process.env.WC_SK;
const publicApiUrl = process.env.API_URL_PUBLIC;
//import sgMail from '@sendgrid/mail';


/**
 * Given a dollar amount, return the amount in cents
 * @param {number} number 
 */
export const fromDecimalToInt = (number) => parseInt(number * 100)

/**
 * 
 * Given a cent amount, return the amount in dollar
 */
export const fromIntToDecimal = (number) => (number)/100

//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const api = new WooCommerceRestApi({
    url: publicApiUrl,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: "wc/v3"
});


/***** Canfirm and uupdate a success order *****/

export async function confirmNewOrder(orderId, success) {
    

    if(!orderId || !success){
        return
    }

    const responseData = {
        success : false,
        order_id: undefined,
        email: undefined
    }


   try {
    
        //Retrieve orders
        const retrieveOrders = await api.get(
            `orders`,
            { per_page: 100, page: 1 }
        );
        const res = retrieveOrders.data

       // console.log('the order:', res)

        // Filter orders based on custom order id
        const filteredOrders = res.filter(order => {
            const metaData = order.meta_data || [];
            const orderCustomIdObject = metaData.find(meta => meta.key === 'order_custom_id');
    
            return orderCustomIdObject && orderCustomIdObject.value === orderId;
        });


        if (filteredOrders.length > 0) {
            // Access the first order found
            const firstOrder = filteredOrders[0];
            const metaData = firstOrder.meta_data || [];
            const orderSessionIdObject = metaData.find(meta => meta.key === 'checkout_session');
            // Retrieve stripe session
            const session = await stripe.checkout.sessions.retrieve(
                orderSessionIdObject.value
            );

            //console.log('session retrieved:', session)

            if(session && session.payment_status == 'paid'){
                responseData.success = true
                responseData.order_id = session.metadata.order_attached_custom_id
                
                //Update order payment status
                const updateOrder = await api.post(
                    `orders/${firstOrder.id}`,
                    {
                        set_paid: true
                    }
                );
                const resUpdatedOrder = updateOrder.data;
                //console.log('resUpdatedOrder:', resUpdatedOrder)

                //Retrieve invoice from Stripe
                const orderInvoice = await stripe.invoices.retrieve(session.invoice);
                //console.log('orderInvoice:', orderInvoice)
                const orderInfo = {
                    total : fromIntToDecimal(session.amount_total),
                    sub_total: fromIntToDecimal(session.amount_subtotal),
                    address: session.shipping_details.address,
                    name: session.shipping_details.name,
                    phone: session.customer_details.phone,
                    order_id: session.metadata && session.metadata.order_attached_custom_id,
                    invoice_url: orderInvoice.hosted_invoice_url,
                    invoice_pdf: orderInvoice.invoice_pdf
                }

                //Check if customer exist
                const existingWooCustomer = await api.get(
                    'customers',
                    {
                        email:  session.customer_details.email
                    }
                );
                //console.log('existingWooCustomer:', existingWooCustomer.data.length)

                //If no customer is found, create customer in WooCommerce
                if(existingWooCustomer.data.length == 0){
                    
                    const customerWcData = {
                        email: session.customer_details.email,
                    }

                    const newCustomer = await api.post(
                        'customers',
                        customerWcData
                    );
                }

                //console.log('orderInfo:', orderInfo)

                //Send email with order information
                /*await sgMail.send({
                    to: session.customer_details.email,
                    from: 'letstalk@signedmonyka.com', 
                    replyTo: 'letstalk@signedmonyka.com', 
                    subject: `Votre commande ${orderInfo.order_id}`,
                    text: `Commande reussi ${orderInfo}`,
                  });
                  */
            }

          } else {
            // No order found with the specified custom number
            //console.log('Order not found.');
          }
    } catch (err) {
        //console.log('err:', err)
    }
    //console.log('response data ?',responseData )
    return Response.json({ responseData });
}