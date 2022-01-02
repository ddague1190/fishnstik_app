export const routeReducer = (state = '', action) => {
    switch(action.type){ 
        case 'UPDATE_KEYWORD':
            return {keyword: action.payload}

        default:
            return state
    }
}
