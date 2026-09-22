import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {memo, useCallback, useMemo, useRef} from 'react';
import { useSelector } from 'react-redux';
import { selectCellSelection, selectDiceNo, selectPocketPileSelection } from '../redux/reducers/gameSelectors';
import { Colors } from '../constants/Colors'
import PileGreen from '../assets/images/piles/green.png'
import PileGreen from '../assets/images/piles/green.png'
import PileRed from '../assets/images/piles/red.png'
import PileBlue from '../assets/images/piles/blue.png'
import PileYellow from '../assets/images/piles/yellow.png'


const Pile = ({cell, pieceId, color, player, onPress}) => {

  const rotation = useRef(new Animated.Value(0)).current;
  const currentPlayerPileSelection = useSelector(selectPocketPileSelection);
  const currentPlayerCellSelection = useSelector(selectCellSelection);
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(state => state.game[`player${player}`]);

  const isPileEnabled = useMemo(
    () => player === currentPlayerPileSelection,
    [player , currentPlayerPileSelection],
  );

  const isCellEnabled = useMemo(
    () => player === currentPlayerCellSelection,
    [player , currentPlayerCellSelection],
  );

  const isForwardable = useCallback(() => {
    const piece = playerPieces?.find(item => item.id === pieceId);
    return piece && piece?.travelCount + diceNo <= 57;
  } , [playerPieces , pieceId , diceNo]);

  const getPileImage = useMemo(() => {
    switch (color) {
      case Colors.green:
        return PileGreen;
      case Colors.red:
        return PileRed;
      case Colors.blue:
        return PileBlue;
      case Colors.yellow:
        return PileYellow;
      default:
        return PileGreen;
    }
  }, [color]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}
      onPress={onPress}>

    </TouchableOpacity>
  );
};

export default memo(Pile)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  hollowCircle: {
    width: 15,
    height: 15,
    position: 'absolute',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedCircleContainer: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
  },
  dashedCircle : {
    width : 25,
    height : 25,
    alignItems : 'center',
    justifyContent : 'center',
  }
})