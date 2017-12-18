import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Character from '../../shared/Character';

export default class MapSquare extends Component {
    render() {
        const {
            hue,
            character,
            size,
            colorSize,
        } = this.props;
        const minSide = size.width < size.height ? size.width : size.height;
        let radius = (minSide / 2) * (colorSize / 10);
        let colorStyle = {
            width: radius,
            height: radius,
            borderRadius: radius / 2,
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
        };
        if (radius === 2) {
            colorStyle.borderWidth = 0;
        }
        const emptyCharacter = <View style={{width: minSide / 2, height: minSide / 2}} />;
        return (
            <View style={[styles.square, size]}>
                {character ? <Character radius={minSide / 4} /> : emptyCharacter}
                {hue ? <View style={[styles.color, colorStyle]} /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    square: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    color: {
        // the dashed border makes it look weird and lumpy, which is ideal
        borderStyle: 'dashed',
        borderColor: 'black',
        borderWidth: 1,
    },
});
