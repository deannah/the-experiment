import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';

class Character extends Component {
    render() {
        const {
            hue,
            saturation,
            lightness,
            radius,
        } = this.props;
        const style = {
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
        };
        return <View style={style} />;
    }
}

function mapStateToProps(state) {
    return {
        hue: state.subject.hue,
        saturation: state.subject.saturation,
        lightness: state.subject.lightness,
    };
}

export default connect(mapStateToProps)(Character);
