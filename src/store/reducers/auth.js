import { STORING_USER } from '../actions/auth';

const INITIAL_STATE = {
    token: null,
    userId: null,
}

// action: STORING_USER ~~ uma só action para login e para cadastro
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STORING_USER:
            return {
                token: action.payload.token,
                userId: action.payload.userId,
            }
        default: 
            return state;
    }
}