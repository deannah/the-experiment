import {
    SET_MESSAGE,
} from '../constants/actionTypes';

const initialState = {
    current: '',
};

export default function(state=initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                current: action.current,
            };
        default:
            return state;
    }
}
