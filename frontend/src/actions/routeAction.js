export const updateKeyword = (keyword) => async (dispatch) => {
    
    dispatch({
        type: 'UPDATE_KEYWORD',
        payload: keyword
    })

}