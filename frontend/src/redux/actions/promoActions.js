import axios from 'axios';

export const getFishSpecies = () => async (dispatch) => {

    
    try {

        const config = {
            headers: {
            }
        }
        // dispatch({type: 'FISH_FACT_REQUEST'});
        const response  = await axios.get('https://www.fishwatch.gov/api/species/red-snapper',
        config
        );
        console.log(response)
    } catch (error) {

    }
}