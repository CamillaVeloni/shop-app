import { STORING_USER, LOGOUT } from '../actions/auth';

const INITIAL_STATE = {
    token: null,
    userId: null,
}

// action: STORING_USER ~~ uma só action para login e para cadastro
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STORING_USER:
            return {
                token: action.token,
                userId: action.userId,
            }
        case LOGOUT: 
            return INITIAL_STATE;
        default: 
            return state;
    }
}