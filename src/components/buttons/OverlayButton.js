import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import ButtonText from '../text/ButtonText';

export default class OverlayButton extends Component {
    onPress = () => {
        const {
            navigation,
            onPress,
            to,
        } = this.props;
        onPress();
        navigation.navigate(to);
    }

    render() {
        const {
            children,
        } = this.props;
        return (
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
                <ButtonText style={styles.text}>{children}</ButtonText>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button : {
        backgroundColor: 'rgba(150, 150, 150, 0.4)',
        borderWidth: 3,
        borderRadius: 3,
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        opacity: 1,
        textAlign: 'center'
    },
});
