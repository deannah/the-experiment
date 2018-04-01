import {
    ADJUST_HUE,
    ADJUST_SATURATION,
    ADJUST_LIGHTNESS,
    ADJUST_X,
    ADJUST_Y,
    SUBJECT_DEATH,
    REPLACE_SUBJECT,
} from '../constants/actionTypes';
import {
    MAX_HUE,
    HALF_HUE,
} from '../constants/color';

import {
    setMessage,
} from './messages';

export function adjustHue(hue) {
    return {
        type: ADJUST_HUE,
        hue,
    };
}

export function adjustHueByAverage({
    currentHue,
    otherHue,
    currentHueWeight,
    otherHueWeight,
}) {
    // https://stackoverflow.com/a/1813558
    const currentAdjustedHue = currentHue > HALF_HUE ? currentHue - MAX_HUE : currentHue;
    const otherAdjustedHue = otherHue > HALF_HUE ? otherHue - MAX_HUE : otherHue;
    const totalHue = currentAdjustedHue * currentHueWeight + otherAdjustedHue * otherHueWeight;
    let nextHue = totalHue;
    if (nextHue < 0) {
        nextHue += MAX_HUE;
    }
    return adjustHue(nextHue);
}

export function adjustSaturation(saturation) {
    const action = {
        type: ADJUST_SATURATION,
        saturation,
    };
    if (saturation < 1) {
        return [
            setMessage('subject has died'),
            action,
            killSubject(),
        ];
    } else if (saturation <= 10) {
        return [
            setMessage('are you sure that is a good idea'),
            action,
        ];
    }
    return action;
}

export function adjustLightness(lightness) {
    const action = {
        type: ADJUST_LIGHTNESS,
        lightness,
    };
    if (lightness < 1) {
        return [
            setMessage('subject has died'),
            action,
            killSubject(),
        ];
    } else if (lightness <= 10) {
        return [
            setMessage('be careful'),
            action,
        ];
    }
    return action;
}

export function adjustX(x) {
    return {
        type: ADJUST_X,
        x,
    };
}

export function adjustY(y) {
    return {
        type: ADJUST_Y,
        y,
    };
}

function killSubject() {
    return {
        type: SUBJECT_DEATH,
    };
}

export function newCharacter() {
    const action = {
        type: REPLACE_SUBJECT,
    };
    return [
        setMessage(''),
        action,
    ];
}
