import getStore from '../';
import config from '../../config';
export const NAMESPACE = 'modalForm';
export const TOGGLE_FORM = `${NAMESPACE}/TOGGLE_FORM`;
export const SET_INPUT = `${NAMESPACE}/SET_INPUT`;

export const ITEM_NAME_INPUT = `${NAMESPACE}/ITEM_NAME_INPUT`;
export const PRICE_INPUT = `${NAMESPACE}/PRICE_INPUT`;

export const SEND_FORM = `${NAMESPACE}/SEND_FORM`;
export const SEND_FORM_SUCCESS = `${NAMESPACE}/SEND_FORM_SUCCESS`;
export const SEND_FORM_FAIL = `${NAMESPACE}/SEND_FORM_FAIL`;


export const toggleModal = () => getStore().dispatch({ type: TOGGLE_FORM });

export const setInput = (input, value) => getStore().dispatch({ type: SET_INPUT, input, value });
export const submit = () => {
    getStore().dispatch({ type: SEND_FORM });
    const { modalForm } = getStore().getState();
    const item_name = modalForm[ITEM_NAME_INPUT];
    const price = modalForm[PRICE_INPUT] * 100;

    fetch(`${config.apiDomain}${config.api.create_order}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_name, price })
    }).then(submitSuccess).catch(submitFail);
}

export const submitSuccess = () => getStore().dispatch({ type: SEND_FORM_SUCCESS });
export const submitFail = () => getStore().dispatch({ type: SEND_FORM_FAIL });

const initialState = {
    isVisible: false,
    isSending: false,
    [ITEM_NAME_INPUT]: '',
    [PRICE_INPUT]: ''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            const { isVisible } = state;
            return { ...state, isVisible: !isVisible };
        case SET_INPUT:
            return { ...state, [action.input]: action.value };
        case SEND_FORM:
            return { ...state, isSending: true };
        case SEND_FORM_SUCCESS:
            return {
                ...state, isSending: false, isVisible: false, [ITEM_NAME_INPUT]: '', [PRICE_INPUT]: ''
            }
        case SEND_FORM_FAIL:
            return { ...state, isSending: false, isVisible: false }
        default:
            return state;
    }
}

export default reducer;
