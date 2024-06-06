import ReactGA from 'react-ga4';
const NEXT_PUBLIC_GOOGLE_TAG = process.env.NEXT_PUBLIC_GOOGLE_TAG

// log the pageview with their URL
export const pageview = (url) => {
  window.gtag && window.gtag('config', NEXT_PUBLIC_GOOGLE_TAG, {
      page_path: url,
    })
  }
  
  // log specific events happening.
  export const event = ({ action, category, label, value }) => {

    const uppercase_first_letter_action =  action[0].toUpperCase() + action.substring(1)

    ReactGA.event({
      category: category,
      action: uppercase_first_letter_action,
      label: label, // optional
      value: value, // optional, must be a number
    });
  }