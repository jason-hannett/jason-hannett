const initialState = {
    likedSongs: [{image: '',
    title: '',
    file: '',
    description: '',
    genre: ''}],   
}

const GET_LIKED_SONGS = 'GET_LIKED_SONGS'

export const getLikedSongs = (arr) => {
    return {
        type: GET_LIKED_SONGS,
        payload: arr
    }
}

export default function likedSongs(state = initialState, action){
    switch(action.type){
        case GET_LIKED_SONGS:
            return{...state, likedSongs: action.payload};
        default:
            return state;
    }        
}