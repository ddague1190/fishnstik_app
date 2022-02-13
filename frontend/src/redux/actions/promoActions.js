import axios from 'axios';

export const getFishSpecies = () => async (dispatch) => {

    const id = Math.floor(Math.random() * 100);

    try {
        const config = {
            headers: {
            }
        }
        dispatch({type: 'FISH_FACT_REQUEST'});

        const {data} = await axios.get(`/api/info/${id}/`);
        dispatch({
            type: 'FISH_FACT_SUCCESS',
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: 'FISH_FACT_FAIL',
        })
    }
}