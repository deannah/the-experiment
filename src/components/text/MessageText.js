import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class MessageText extends Component {
    render() {
        const {
            children,
        } = this.props;
        return (<Text style={styles.text}>
            {children}
        </Text>);
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'notoserif',
    },
});
