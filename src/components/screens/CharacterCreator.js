import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider
} from 'react-native-color';

import {
    adjustHue,
    adjustSaturation,
    adjustLightness,
} from '../../actions/subject';
import PageHeaderText from '../text/PageHeaderText';
import NavigateButton from '../buttons/NavigateButton';
import Character from '../shared/Character';

class CharacterCreator extends Component {
    onHueChange = (hue) => {
        const {
            actions,
        } = this.props;
        actions.adjustHue(hue);
    }

    onSaturationChange = (saturation) => {
        const {
            actions,
        } = this.props;
        if (saturation < 0.1) {
            // Don't let user set it too low
            return;
        }
        actions.adjustSaturation(Math.round(saturation * 100));
    }

    onLightnessChange = (lightness) => {
        const {
            actions,
        } = this.props;
        if (lightness < 0.1) {
            // Don't let user set it too low
            return;
        }
        actions.adjustLightness(Math.round(lightness * 100));
    }

    render() {
        const {
            navigation,
            hue,
            saturation,
            lightness,
        } = this.props;
        const color = {
            h: hue,
            s: saturation / 100,
            l: lightness / 100,
            a: 1,
        };
        return (<View style={styles.container}>
            <PageHeaderText>Choose your character</PageHeaderText>
            <Character radius={25} />
            <View style={styles.content}>
                <HueSlider
                    style={styles.sliderRow}
                    gradientSteps={40}
                    value={hue}
                    onValueChange={this.onHueChange}
                />
                <SaturationSlider
                    style={styles.sliderRow}
                    gradientSteps={20}
                    color={color}
                    value={saturation / 100}
                    onValueChange={this.onSaturationChange}
                />
                <LightnessSlider
                    style={styles.sliderRow}
                    gradientSteps={20}
                    color={color}
                    value={lightness / 100}
                    onValueChange={this.onLightnessChange}
                />
            </View>
            <NavigateButton to='Environment' navigation={navigation}>begin</NavigateButton>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderRow: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginTop: 12
    },
    content: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 32,
        paddingBottom: 32
    },
});

function mapStateToProps(state) {
    return {
        hue: state.subject.hue,
        saturation: state.subject.saturation,
        lightness: state.subject.lightness,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            adjustHue,
            adjustSaturation,
            adjustLightness,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreator);
