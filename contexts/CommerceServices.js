//Required 
import {
  createCheckoutSession,
  createUser,
  contactUs
} from '/lib/apis';
//const FRONT_END_API = process.env.FRONT_END_API;
//const API_URL = process.env.API_URL;


const newCart = {
  id: '',
  items: [],
  checkout_url: '',
  checkout_id: '',
  total: 0
};

export async function getUserCart() {

  if (typeof window === 'undefined') {
    // Sanity check: Ensure that this function is run in a browser environment
    return false;
  }
  
  const cartString = window.localStorage.getItem("cart");
  //console.log('cartString:', cartString)

  if (!cartString || cartString === 'undefined' || cartString === null) {
    // There is no cart in localStorage, so we return false
    console.log('cartString:', cartString)
    return false;
  }else{
    try {
      const cart = JSON.parse(cartString);
      if (cart && cart.items && Array.isArray(cart.items) && cart.items.length >= 0) {
        return cart;
      }
    } catch (e) {
      console.error('Parsing error in getUserCart:', e);
      // Parsing failed, the cart data is likely corrupt, handle this case appropriately
    }
  }

  
    return false;
}

/**
 * Create an active cart in local storage
 * @returns 
 */
export const createLocalCart = async () => {
  
  const existingCart = await getUserCart();
  

  // If a cart already exists, return it
  if (existingCart) {
    return existingCart;
  }

  // Otherwise, create a new cart and save the new cart in local storage
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  return newCart
}

export const saveCartToStorage = async (cart) => {
  if (typeof window !== 'undefined') {
    if(cart && cart.items){
      cart.total =
      cart.items.length > 0 &&
      cart.items.reduce((a, c) => a + c.unitPrice * c.quantity, 0);

    localStorage.setItem('cart', JSON.stringify(cart));

    }
  }
}

/**
*Create an active cart and add an item to it
*/
export const addCartItem = async (cart, product) => {
  
  //If no cart registered, create cart
  if (!cart) {
    console.log('there is no cart, creating cart...')
    cart = await createLocalCart();
  }

  // Check if the product is already in the cart
  const existingItemIndex = cart.items.length > 0 && cart.items.findIndex((item) => item.product.id === product.id);

  if (existingItemIndex >= 0 && existingItemIndex !== false) {
    //console.log('item exist in cart, incrementing it...')
    // Product already in the cart, update quantity
    cart.items[existingItemIndex].quantity += 1;
    const saveToStorage = saveCartToStorage(cart);
    return cart
  } else {
    //console.log('item is not in cart, adding it...')
    // Product not in the cart, add a new item
    const newItem = {
      product: {
        id: product.id,
        name: product.name,
        featured_image: product.featured_image,
        permalink: product.permalink,
        sale_price: product.sale_price,
      },
      price_id: product.price_id,
      unitPrice: product.price,
      quantity: 1,
      total_price: product.price, // You might want to adjust this based on your logic
    };

    cart.items.push(newItem);
    const saveToStorage = saveCartToStorage(cart);
    return cart
  }
}



/**
 * Remove item from active cart
 * @param {*} cart 
 * @param {*} productId 
 * @returns 
 */
export const removeFromCart = async (cart, productId) => {
  // If the cart doesn't exist, there's nothing to remove
  if (!cart) {
    return null; // or handle accordingly based on your logic
  }

  // Find the index of the item to remove based on the product ID
  const itemIndex = cart.items.findIndex((item) => item.product.id === productId);

  if (itemIndex !== -1) {
    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Update the total price and any other properties you need
    // ...
    const saveToStorage = saveCartToStorage(cart);
    return cart;
  }

  // If the product is not in the cart, return the original cart
  return cart;
}

/**
 * Empty cart
 * @returns 
 */
export const emptyCart = () => {
  // Create a new empty cart using your existing function
  // Save the new cart in local storage
  localStorage.setItem('cart', JSON.stringify(newCart));
  // You can add any additional logic here, such as updating other properties
  return newCart;
};


/**
 * Decrease the quantity of a product in the cart
 * @param {*} cart 
 * @param {*} productId 
 * @returns 
 */
export const decreaseCartItem = (cart, productId) => {
  // If the cart doesn't exist, there's nothing to decrease
  if (!cart) {
    return null; // or handle accordingly based on your logic
  }

  // Find the index of the item to decrease based on the product ID
  const itemIndex = cart.items.findIndex((item) => item.product.id === productId);

  if (itemIndex !== -1) {
    // Decrease the quantity, and remove the item if quantity becomes zero
    cart.items[itemIndex].quantity -= 1;

    if (cart.items[itemIndex].quantity <= 0) {
      // Remove the item from the items array if quantity is zero or negative
      cart.items.splice(itemIndex, 1);
    }

    // Update the total price and any other properties you need
    // ...
    const saveToStorage = saveCartToStorage(cart);
    return cart;
  }

  // If the product is not in the cart, return the original cart
  return cart;
};

export async function createCustomer(user) {

  //link cart to user
  const retrieveCart = swell && (await swell.account.create({
    email: user.email,
    first_name: user.firstname, // Optional
    last_name: user.lastname, // Optional
    email_optin: true, // Optional
    password: user.password // Optional
  }))

  return retrieveCart
}

export async function createNewCheckoutSession(cart) {
  //console.log('ready to checkout !:', cart)

  const createSessionToCheckout = await createCheckoutSession(cart);
  return createSessionToCheckout
}


export async function sendMessage(data){
  const sendMessageToUs = await contactUs(data)
  return sendMessageToUs
}

  
export async function createAccount(data){
    const createUseraccount = await createUser(data);
    return createUseraccount
}


