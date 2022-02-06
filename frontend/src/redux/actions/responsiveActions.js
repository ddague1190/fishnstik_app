export const updateViewportDimensions = (width, height) => async (dispatch) => {
    
    dispatch({
        type: 'UPDATE_VIEWPORT_DIMENSIONS',
        payload: {width, height}
    })

}