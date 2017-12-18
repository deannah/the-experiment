import {
    SET_MESSAGE,
} from '../constants/actionTypes';

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        current: message,
    };
}
