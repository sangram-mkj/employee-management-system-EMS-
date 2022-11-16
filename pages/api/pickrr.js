//All the API for courier order operations

export const AUTH_TOKEN = 'e66d2ff2e049324cc7e49e0419c7ec69271433';
export const CREATE_ORDER = `https://pickrr.com/api/place-order/`;
export const CANCEL_ORDER = `https://pickrr.com/api/order-cancellation/`; //POST
export const CHECK_PINCODE = `/api/check-pincode-service/`;
export const TRACK_PACKAGE = `https://async.pickrr.com/track/tracking/`;
export const PNG_STATUS = `https://pickrr.com/order/generate-user-order-manifest-png/`; //YOUR_AUTH_TOKEN/ORDER_PK_IN_RESPONSE_OF_PLACE_ORDER_API/