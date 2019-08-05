import getStore from '../';
import config from '../../config'
export const NAMESPACE = 'health';
export const GET_CHECK_ORDER = `${NAMESPACE}/GET_CHECK_ORDER`;
export const GET_CHECK_ORDER_SUCCESS = `${NAMESPACE}/GET_CHECK_ORDER_SUCCESS`;
export const GET_CHECK_ORDER_FAIL = `${NAMESPACE}/GET_CHECK_ORDER_FAIL`;

export const GET_CHECK_PAYMENT = `${NAMESPACE}/GET_CHECK_PAYMENT`;
export const GET_CHECK_PAYMENT_SUCCESS = `${NAMESPACE}/GET_CHECK_PAYMENT_SUCCESS`;
export const GET_CHECK_PAYMENT_FAIL = `${NAMESPACE}/GET_CHECK_PAYMENT_FAIL`;

export const checkOrder = () => {
    getStore().dispatch({ type: GET_CHECK_ORDER });
    fetch(`${config.orderTimestamp}`)
        .then(response => checkOrderSuccess(response.status))
        .catch((err) => checkOrderFail());

}
export const checkOrderSuccess = (data) => getStore().dispatch({ type: GET_CHECK_ORDER_SUCCESS, data });
export const checkOrderFail = () => getStore().dispatch({ type: GET_CHECK_PAYMENT_FAIL });

export const checkPayment = () => {
    getStore().dispatch({ type: GET_CHECK_PAYMENT });
    fetch(`${config.paymentTimestamp}`)
        .then(response => checkPaymentSuccess(response.status))
        .catch((err) => checkPaymentFail());

}
export const checkPaymentSuccess = (data) => getStore().dispatch({ type: GET_CHECK_PAYMENT_SUCCESS, data });
export const checkPaymentFail = () => getStore().dispatch({ type: GET_CHECK_PAYMENT_FAIL });

const initialState = {
    orderStatus: 'checking',
    paymentStatus: 'checking',
}

function healthReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHECK_ORDER_FAIL:
        case GET_CHECK_ORDER:
            return { ...state, orderStatus: 'checking' };
        case GET_CHECK_ORDER_SUCCESS:
            const orderStatus = action.data === 200 ? 'OK' : 'DEAD';
            return { ...state, orderStatus }
        case GET_CHECK_PAYMENT_FAIL:
        case GET_CHECK_PAYMENT:
            return { ...state, paymentStatus: 'checking' };
        case GET_CHECK_PAYMENT_SUCCESS:
            const paymentStatus = action.data === 200 ? 'OK' : 'DEAD';
            return { ...state, paymentStatus }
        default:
            return state;
    }
}

export default healthReducer;
