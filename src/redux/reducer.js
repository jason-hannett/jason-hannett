const initialState = {
    username: '',
    id: 0,
    profilePic: ''
}

const SET_USER_INFO = 'SET_USER_INFO'

export const setUserInfo = (id, username, profilePic) => {
    console.log(username)
    console.log(id)
    return {
        type: SET_USER_INFO,
        payload: {id, username, profilePic}
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER_INFO:
            console.log(action.payload)
            return {...state, ...action.payload}
        default: 
            return state;
    }
}