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
    setMessage,
} from './messages';

import {
    convertHueToDegree,
    convertDegreeToHue,
    convertDegreesToRadians,
    convertRadiansToDegrees,
} from '../helpers/math';

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
    // convert to degrees
    let degreeA = convertHueToDegree(currentHue);
    let degreeB = convertHueToDegree(otherHue);
    // now adjust to radians
    degreeA = convertDegreesToRadians(degreeA);
    degreeB = convertDegreesToRadians(degreeB);
    // do some math to find the average angle
    let X = Math.cos(degreeA) + Math.cos(degreeB);
    let Y = Math.sin(degreeA) + Math.cos(degreeB);
    if (currentHueWeight && otherHueWeight) {
        // adjusts it by the weight (between 0 and 1) if supplied
        X *= currentHueWeight;
        Y *= otherHueWeight;
    }
    const averageRadians = Math.atan2(Y, X);
    const nextHue = convertDegreeToHue(convertRadiansToDegrees(averageRadians));
    console.log(currentHue, otherHue, degreeA, degreeB, X, Y, convertRadiansToDegrees(averageRadians));
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
