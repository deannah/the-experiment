import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {
    adjustX,
    adjustY,
    adjustLightness,
} from '../../actions/subject';
import ButtonText from '../text/ButtonText';

class MoveButton extends Component {
    render() {
        const {
            x,
            y,
            direction,
            actions,
            lightness,
            dead,
        } = this.props;
        const arrow = '\u25B2';
        let rotate;
        let onPress;
        switch (direction) {
            case 'up':
                onPress = () => actions.adjustY(y - 1);
                break;
            case 'down':
                rotate = 180;
                onPress = () => actions.adjustY(y + 1);
                break;
            case 'left':
                rotate = 270;
                onPress = () => actions.adjustX(x - 1);
                break;
            case 'right':
                rotate = 90;
                onPress = () => actions.adjustX(x + 1);
                break;
            default:
                throw 'MoveButton direction must be one of: up, down, left, right';
        }
        const rotateStyle = {};
        if (rotate) {
            rotateStyle.transform = [{
                rotate: `${rotate}deg`,
            }];
        }
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onPress();
                    actions.adjustLightness(lightness - 1);
                }}
                disabled={dead}
            >
                <ButtonText style={rotateStyle}>{arrow}</ButtonText>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button : {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#222',
        alignSelf: 'stretch',
    },
});

function mapStateToProps(state) {
    return {
        x: state.subject.x,
        y: state.subject.y,
        lightness: state.subject.lightness,
        dead: state.subject.dead,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            adjustX,
            adjustY,
            adjustLightness,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveButton);
