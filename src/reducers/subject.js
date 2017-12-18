import {
    ADJUST_HUE,
    ADJUST_SATURATION,
    ADJUST_LIGHTNESS,
    ADJUST_X,
    ADJUST_Y,
    SUBJECT_DEATH,
    REPLACE_SUBJECT,
} from '../constants/actionTypes';

const initialState = {
    x: 0,
    y: 0,
    hue: 42,
    saturation: 100,
    lightness: 50,
    dead: false,
};

export default function(state=initialState, action) {
    switch (action.type) {
        case ADJUST_HUE:
            return {
                ...state,
                hue: action.hue,
            };
        case ADJUST_SATURATION:
            return {
                ...state,
                saturation: action.saturation,
            };
        case ADJUST_LIGHTNESS:
            return {
                ...state,
                lightness: action.lightness,
            };
        case ADJUST_X:
            return {
                ...state,
                x: action.x,
            };
        case ADJUST_Y:
            return {
                ...state,
                y: action.y,
            };
        case SUBJECT_DEATH:
            return {
                ...state,
                dead: true,
            };
        case REPLACE_SUBJECT:
            return {
                ...initialState,
                hue: state.hue,
            };
        default:
            return state;
    }
}
