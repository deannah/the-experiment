import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import ButtonText from '../text/ButtonText';

export default class NavigateButton extends Component {
    render() {
        const {
            navigation,
            children,
            to,
        } = this.props;
        return (
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(to)}>
                <ButtonText>{children}</ButtonText>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button : {
        backgroundColor: '#333',
    },
});
