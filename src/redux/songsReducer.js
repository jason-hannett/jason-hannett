const initialState = {
    song_id: undefined,
    image: '',
    title: '',
    file: '',
    description: '',
    genre: '',

}

const SET_SONG_INFO = 'SET_SONG_INFO'

export const setSongInfo = (song_id, image, title, file, description, genre) => {
    return {
        type: SET_SONG_INFO,
        payload: {song_id, image, title, file, description, genre}
    }
}

export default function songInfo(state = initialState, action){
    switch(action.type){
        case SET_SONG_INFO:
            return{...state, ...action.payload};
        default:
            return state;
    }        
}