import getStore from '../';
import config from '../../config'
export const NAMESPACE = 'health';
export const GET_CHECK_ORDER = `${NAMESPACE}/GET_CHECK_ORDER`;
export const GET_CHECK_ORDER_SUCCESS = `${NAMESPACE}/GET_CHECK_ORDER_SUCCESS`;
export const GET_CHECK_ORDER_FAIL = `${NAMESPACE}/GET_CHECK_ORDER_FAIL`;

export const GET_CHECK_PAYMENT = `${NAMESPACE}/GET_CHECK_PAYMENT`;
export const GET_CHECK_PAYMENT_SUCCESS = `${NAMESPACE}/GET_CHECK_PAYMENT_SUCCESS`;
export const GET_CHECK_PAYMENT_FAIL = `${NAMESPACE}/GET_CHECK_PAYMENT_FAIL`;

// export const getPublicData = () => {
//     getStore().dispatch({ type: GET_PUBLIC_DATA });
//     fetch(`${config.apiDomain}api/airports`)
//         .then(response => response.json())
//         .then(response => getPublicDataSuccess(response))

// }
// export const getPublicDataSuccess = (data) => getStore().dispatch({ type: GET_PUBLIC_DATA_SUCCESS, data });
// export const getPublicDataFail = () => getStore().dispatch({ type: GET_PUBLIC_DATA_FAIL });

export const checkOrder = () => {
    getStore().dispatch({ type: GET_CHECK_ORDER });
    fetch(`${config.orderTimestamp}`)
        .then(response => checkOrderSuccess(response.status))
        .catch((err) => console.log(err))//checkOrderFail());

}
export const checkOrderSuccess = (data) => getStore().dispatch({ type: GET_CHECK_ORDER_SUCCESS, data });
export const checkOrderFail = () => getStore().dispatch({ type: GET_CHECK_PAYMENT_FAIL });

const initialState = {
    orderStatus: 'checking',
    paymentStatus: 'checking',
}

function healthReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHECK_PAYMENT_FAIL:
        case GET_CHECK_ORDER:
            return { ...state, orderStatus: 'checking' };
        case GET_CHECK_ORDER_SUCCESS:
            const orderStatus = action.data === 200 ? 'OK' : 'fail';
            return { ...state, orderStatus }
        // case GET_ROUTES:
        //     return { ...state, getRouteLoading: true };
        default:
            return state;
    }
}

export default healthReducer;
