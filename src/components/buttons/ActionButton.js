import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import ButtonText from '../text/ButtonText';

const leftArrow = '\u2190';
const rightArrow = '\u2192';
const totalBorder = 4;
const totalMargin = 4;

export default class ActionButton extends Component {
    render() {
        const {
            type,
            height,
            width,
            onPress,
            disabled,
        } = this.props;
        let diagram;
        let isDisabled = false;
        if (disabled !== undefined) {
            isDisabled = disabled;
        }
        let circleStyle;
        let arrowStyle;
        switch (type) {
            case 'eject':
                arrowStyle = {
                    left: width * 0.45,
                };
                diagram = [
                    <View style={styles.diagramCircle} key='eject-circle' />,
                    (<View style={[styles.diagramArrow, arrowStyle]} key='eject-arrow'>
                        <Text style={styles.diagramText}>{rightArrow}</Text>
                    </View>),
                ];
                break;
            case 'absorb':
                arrowStyle = {
                    left: width / 3,
                };
                diagram = [
                    <View style={styles.diagramCircle} key='absorb-circle' />,
                    (<View style={[styles.diagramArrow, arrowStyle]} key='absorb-arrow'>
                        <Text style={styles.diagramText}>{leftArrow}</Text>
                    </View>),
                ];
                break;
            case 'disabled':
                isDisabled = true;
                circleStyle = {
                    borderColor: '#888',
                };
                diagram = [
                    <View style={[styles.diagramCircle, circleStyle]} key='disabled-circle' />,
                ];
                break;
            default:
                throw 'ActionButton type must be one of: eject, absorb, disabled';
        }
        const buttonStyle = {
            height: height - totalBorder - totalMargin,
        };
        const buttonStyles = [styles.button, buttonStyle];
        if (isDisabled) {
            buttonStyles.push({
                borderColor: '#888',
            });
        }
        return (
            <TouchableOpacity disabled={isDisabled} style={buttonStyles} onPress={onPress}>
                {diagram}
            </TouchableOpacity>
        );
    }
}

const circleRadius = 20;

const styles = StyleSheet.create({
    button : {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'black',
        borderRadius: 3,
        borderColor: 'white',
        borderWidth: totalBorder / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: totalMargin / 2,
        marginRight: totalMargin / 2,
    },
    diagramText: {
        color: 'white',
        fontSize: circleRadius * 2,
    },
    diagramCircle: {
        width: circleRadius * 2,
        height: circleRadius * 2,
        borderRadius: circleRadius,
        borderColor: 'white',
        borderWidth: 3,
    },
    diagramArrow: {
        position: 'absolute',
    },
});
