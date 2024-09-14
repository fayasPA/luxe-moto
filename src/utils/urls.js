const development = false
let urls;

if (development) {
  // development urls
  urls = {
    // BASE_URL: "http://192.168.41.1:8080/myapp/",
    // BASE_IMAGE_URL: "http://192.168.41.1:8080",
    BASE_URL: "http://localhost:8080/myapp/",
    BASE_IMAGE_URL: "http://localhost:8080",
  };
} else {
  // Production urls
  urls = {
    BASE_URL: "https://luxemoto.in/myapp/",
    BASE_IMAGE_URL: "https://luxemoto.in",
  };
}

export const { BASE_URL, BASE_IMAGE_URL } = urls;

export const GET_BANNER_VEHICLES = 'get_banner_details';
export const GET_LATEST_VEHICLES = 'get_premium_cars_all';
export const GET_LATEST_DELIVERY = 'get_latest_delivery';
export const GET_ALL_VEHICLES = 'get_stock_cars_all';
export const GET_FILTER_TYPES = 'get_filter_types';
export const GET_VEHICLE_DETAILS = 'get_specific_vehicle';
export const GET_YOUTUBE_LINKS = 'get_youtube_links';
export const GET_STAR_DELIVERIES = 'get_all_delivery';
export const POST_SELL_VEHICLE_FORM = 'https://script.google.com/macros/s/AKfycbzUWJWxa7iW0JT-Ow6o0ONTuaPRVxOvqt8A3UdB4a2GmvZtwWrwcHBOerVFJA4YGVJNsg/exec';
export const POST_ENQUIRY_FORM = 'https://script.google.com/macros/s/AKfycbwkDCFLdDnciykwS0Np7Dp0hXscQ_18Iks65DjB4BcxRkTyYl4rk98xggdxIBFSxFQ4/exec';
