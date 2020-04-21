const initialState = {
    artist_id: undefined,
    artist_name: '',
    age: undefined
}

const SET_ARTIST_INFO = 'SET_ARTIST_INFO'

export const setArtistInfo = (artist_id, artist_name, age) => {
    return {
        type: SET_ARTIST_INFO,
        payload: {artist_id, artist_name, age}
    }
}

export default function artistInfo(state = initialState, action){
    switch(action.type){
        case SET_ARTIST_INFO:
            return{...state, ...action.payload};
        default:
            return state;
    }        
}