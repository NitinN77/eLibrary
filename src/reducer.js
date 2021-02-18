export const initialState = {
    products: [],
    cart: [],
    checkoutToken: null,
    user: null,
    borrowed : [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { 
                ...state,
                products: action.data,
            };
        case 'SET_CART':
            return {
                ...state,
                cart: action.data,
            }
        case 'SET_TOKEN':
            return {
                ...state,
                checkoutToken: action.data,
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.data,
            }
        case 'SET_BORROWED':
            return {
                ...state,
                borrowed: action.data,
            }
        default:
            return {
                ...state
            }
    }
};

export default reducer;