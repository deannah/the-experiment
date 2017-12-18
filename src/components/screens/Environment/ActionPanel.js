import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    adjustSaturation,
    adjustHueByAverage,
} from '../../../actions/subject';
import ActionButton from '../../buttons/ActionButton';

class ActionPanel extends Component {
    onEject = () => {
        const {
            actions,
            saturation,
            onEject,
        } = this.props;
        actions.adjustSaturation(saturation - 5);
        onEject();
    }

    onAbsorb = () => {
        const {
            actions,
            hue,
            onAbsorb,
            npcHue,
        } = this.props;
        actions.adjustHueByAverage({
            currentHue: hue,
            otherHue: npcHue,
            currentHueWeight: 0.9,
            otherHueWeight: 0.1,
        });
        onAbsorb();
    }

    render() {
        const {
            height,
            width,
            canAbsorb,
        } = this.props;
        return (
            <View style={[styles.panel, { height }]}>
                <ActionButton type='disabled' height={height} width={width / 4} />
                <ActionButton onPress={this.onEject} type='eject' height={height} width={width / 4} />
                <ActionButton disabled={!canAbsorb} onPress={this.onAbsorb} type='absorb' height={height} width={width / 4} />
                <ActionButton type='disabled' height={height} width={width / 4} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        flexDirection: 'row',
    },
});

function mapStateToProps(state) {
    return {
        saturation: state.subject.saturation,
        hue: state.subject.hue,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            adjustSaturation,
            adjustHueByAverage,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPanel);
