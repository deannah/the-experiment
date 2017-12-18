import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MessageText from '../text/MessageText';

class Messages extends Component {
    render() {
        const {
            currentText,
        } = this.props;
        return (<View style={styles.messages}>
            <MessageText>{currentText}</MessageText>
        </View>);
    }
}

const styles = StyleSheet.create({
    messages: {
        flex: 1,
    },
});

function mapStateToProps(state) {
    return {
        currentText: state.messages.current,
    };
}

export default connect(mapStateToProps)(Messages);
