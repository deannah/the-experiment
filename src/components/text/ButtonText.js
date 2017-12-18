import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class ButtonText extends Component {
    render() {
        const {
            children,
            style,
        } = this.props;
        return (<Text style={[styles.text, style]}>
            {children}
        </Text>);
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#DDD',
        fontSize: 30,
    },
});
