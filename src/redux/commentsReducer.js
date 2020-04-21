const initialState = {
    comment: ''
    
    
}

const POST_COMMENT = 'POST_COMMENT'

export const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        payload: comment
    }
}

export default function comment(state = initialState, action){
    switch(action.type){
        case POST_COMMENT:
            return{...state, ...action.payload};
        default:
            return state;
    }        
}