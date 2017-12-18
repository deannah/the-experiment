import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class PageHeaderText extends Component {
    render() {
        const {
            children,
        } = this.props;
        return (<Text style={styles.pageHeader}>
            {children}
        </Text>);
    }
}

const styles = StyleSheet.create({
    pageHeader: {
        color: 'white',
        fontSize: 30,
    },
});
