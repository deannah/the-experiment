import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    newCharacter,
} from '../../actions/subject';
import OverlayButton from '../buttons/OverlayButton.js';
import MoveButton from '../buttons/MoveButton.js';
import Character from '../shared/Character';
import Messages from '../shared/Messages';
import MapColumn from './Environment/MapColumn';
import MapSquare from './Environment/MapSquare';
import ActionPanel from './Environment/ActionPanel';

const SQUARES_X = 3;
const SQUARES_Y = 5;

class Environment extends Component {
    initializeMap = (oldMap, x, y) => {
        const newMap = {
            ...oldMap,
        };
        for (let i = x - SQUARES_X; i <= x + SQUARES_X; i++) {
            if (!newMap[i]) {
                newMap[i] = {};
            }
            for (let j = y - SQUARES_Y; j <= y + SQUARES_Y; j++) {
                if (!newMap[i][j]) {
                    newMap[i][j] = this.generateRandomMapSquare();
                }
            }
        }
        return newMap;
    }

    state = {
        map: this.initializeMap({}, this.props.x, this.props.y),
    };

    generateRandomMapSquare() {
        const square = {};
        if (Math.random() > 0.7) {
            square.hue = Math.random() * 360;
            square.colorSize = 10;
        }
        return square;
    }

    componentWillReceiveProps(nextProps) {
        const {
            x,
            y,
        } = this.props;
        const {
            map,
        } = this.state;
        if (x !== nextProps.x || y !== nextProps.y) {
            this.setState({map: this.initializeMap(map, nextProps.x, nextProps.y)});
        }
    }

    onEject = () => {
        const {
            x,
            y,
            hue,
        } = this.props;
        this.setState(prevState => {
            const newMap = {...prevState.map};
            const current = newMap[x][y];
            if (!current.hue) {
                // If square has no npc, it will gain player's current hue
                current.hue = hue;
            }
            if (!current.colorSize) {
                // If square has no npc, it will start at size 1
                current.colorSize = 1;
            } else if (current.colorSize < 10) {
                // increase the npc's size in current square
                current.colorSize++;
            }
            return {
                map: newMap,
            };
        });
    }

    onAbsorb = () => {
        const {
            x,
            y,
        } = this.props;
        this.setState(prevState => {
            const newMap = {...prevState.map};
            const current = newMap[x][y];
            // decrease npc's size
            current.colorSize--;
            return {
                map: newMap,
            };
        })
    }

    resetGame = () => {
        const {
            actions,
        } = this.props;
        const newX = 0;
        const newY = 0;
        actions.newCharacter();
        this.setState({
            map: this.initializeMap({}, newX, newY),
        });
    }

    isNPC = () => {
        const {
            x,
            y,
        } = this.props;
        const {
            map,
        } = this.state;
        const currentSquare = map[x][y];
        return currentSquare.hue && currentSquare.colorSize > 0;
    }

    makeGameGrid = (width, height) => {
        const {
            x,
            y,
        } = this.props;
        const {
            map,
        } = this.state;
        const result = [];
        const addToMap = {};
        const size = {
            width: width / (SQUARES_X * 2 + 1),
            height: height / (SQUARES_Y * 2 + 1),
        };
        for (let i = x - SQUARES_X; i <= x + SQUARES_X; i++) {
            const col = [];
            for (let j = y - SQUARES_Y; j <= y + SQUARES_Y; j++) {
                const showCharacter = i === x && j === y;
                col.push(<MapSquare size={size} key={j} {...map[i][j]} character={showCharacter} />);
            }
            result.push(<MapColumn size={{width: size.width, height: height}} key={i}>{col}</MapColumn>);
        }
        return result;
    }

    render() {
        const {
            navigation,
            dead,
            x,
            y,
            hue,
        } = this.props;
        console.log(hue);
        const {
            map,
        } = this.state;
        const {
            width,
            height,
        } = Dimensions.get('window');
        const currentSquare = map[x][y];
        const isNPC = this.isNPC();
        const numCols = SQUARES_X * 2 + 1;
        const numRows = SQUARES_Y * 2 + 1;
        const actionPanelRows = 2;
        const messageRows = 1;
        const bottomRows = actionPanelRows + messageRows;
        const colWidth = width / (numCols + 2);
        const rowHeight = height / (numRows + 2 + bottomRows);
        const horizontalButtonStyle = {
            width: width,
            height: rowHeight,
        };
        const verticalButtonStyle = {
            width: colWidth,
            height: rowHeight * numRows,
        };
        const centerStyle = {
            width: colWidth * numCols,
            height: rowHeight * numRows,
        };
        const bottomStyle = {
            width: width,
            height: rowHeight * bottomRows,
        };
        const centerOverlay = (
            <View style={[styles.centerOverlay, centerStyle]}>
                <Text style={styles.overlayText}>ded</Text>
                <OverlayButton to='CharacterCreator' navigation={navigation} onPress={this.resetGame}>try again</OverlayButton>
            </View>
        );
        return (
            <View style={styles.container}>
                <View style={horizontalButtonStyle}>
                    <MoveButton direction='up' />
                </View>
                <View style={styles.middleRow}>
                    <View style={verticalButtonStyle}>
                        <MoveButton direction='left' />
                    </View>
                    <View>
                        <View style={[styles.middleRow, centerStyle]}>
                            {this.makeGameGrid(centerStyle.width, centerStyle.height)}
                        </View>
                        {dead ? centerOverlay : null}
                    </View>
                    <View style={verticalButtonStyle}>
                        <MoveButton direction='right' />
                    </View>
                </View>
                <View style={horizontalButtonStyle}>
                    <MoveButton direction='down' />
                </View>
                <View style={bottomStyle}>
                    <Messages />
                    <ActionPanel
                        height={rowHeight * actionPanelRows}
                        width={width}
                        onEject={this.onEject}
                        onAbsorb={this.onAbsorb}
                        canAbsorb={isNPC}
                        npcHue={currentSquare.hue}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleRow: {
        flexDirection: 'row',
    },
    centerOverlay: {
        backgroundColor: 'rgba(100, 100, 100, 0.45)',
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'space-around',
    },
    overlayText: {
        color: 'white',
        fontSize: 50,
        textAlign: 'center',
    },
});

function mapStateToProps(state) {
    return {
        x: state.subject.x,
        y: state.subject.y,
        dead: state.subject.dead,
        hue: state.subject.hue,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            newCharacter,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Environment);
