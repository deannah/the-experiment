import React, { Component } from 'react';
import { View } from 'react-native';

export default class MapColumn extends Component {
    render() {
        const {
            children,
            size,
        } = this.props;
        return (
            <View style={size}>
                {children}
            </View>
        );
    }
}
