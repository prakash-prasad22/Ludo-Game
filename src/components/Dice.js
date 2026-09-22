import { Animated, Easing, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPlayerChance, selectDiceNo, selectDiceRolled } from '../redux/reducers/gameSelectors';
import { BackgroundImage } from '../helpers/GetIcons';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import Arrow from '../assets/images/arrow.png';
import DiceRoll from '../assets/animation/diceroll.json';

const Dice = React.memo(({color , player , rotate , data}) => {
  const dispatch = useDispatch();
  const currentPlayerChance = useSelector(selectCurrentPlayerChance);
  const isDiceRolled = useSelector(selectDiceRolled)
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(
    state => state.game[`player${currentPlayerChance}`],
  );
  const pileIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo);
  const delay = ms => new Promise(resolve => setTimeout(resolve , ms));

  const arrowAnim = useRef(new Animated.Value(0)).current;
  const [diceRolling , setDiceRolling] = useState(false);

  useEffect(() => {
    const animateArrow = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(arrowAnim , {
                    toValue : 10,
                    duration : 600,
                    easing : Easing.out(Easing.ease),
                    useNativeDriver : true
                }),
                Animated.timing(animateArrow , {
                    toValue : -10,
                    duration : 400,
                    easing : Easing.in(Easing.ease),
                    useNativeDriver : true
                })
            ])
        ).start();
    };

    animateArrow();
  } , [currentPlayerChance , isDiceRolled])

  const handleDicePress = () => {
    
  }

  return (
    <View style={[styles.flexRow , {transform : [{scaleX : rotate ? -1 : 1}]}]}>
        <View style={styles.border1}>
            <LinearGradient
                style={styles.linearGradient}
                colors={['#0052be' , '#5f9fcb' , '#97c6c9']}
                start={{x : 0, y : 0.5}}
                end={{x : 1, y : 0.5}}
            >
                <View style={styles.pileContainer}>
                    <Image source={pileIcon} style={styles.pileIcon}/>
                </View>
            </LinearGradient>
        </View>

        <View style={styles.border2}>
            <LinearGradient
                style={styles.diceGradient}
                colors={['#aac8ab', '#aac8ab', '#aac8ab']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
            >
                <View style={styles.diceContainer}>
                {currentPlayerChance == player ? (
                    <>
                    {diceRolling ? null : (
                        <TouchableOpacity
                        disabled={isDiceRolled}
                        activeOpacity={0.4}
                        onPress={handleDicePress}>
                        <Image source={diceIcon} style={styles.dice} />
                        </TouchableOpacity>
                    )}
                    </>
                ) : null}
                </View>
            </LinearGradient>
        </View>

        {currentPlayerChance === player && !isDiceRolled ? (
            <Animated.View style={{transform: [{translateX: arrowAnim}]}}>
              <Image source={Arrow} style={{width: 30, height: 30}} />
            </Animated.View>
        ) : null}

        {currentPlayerChance === player && diceRolling ? (
            <LottieView
              source={DiceRoll}
              style={styles.rollingDice}
              loop={false}
              autoPlay
              cacheComposition={true}
              hardwareAccelerationAndroid
            />
        ) : null}
        
    </View>
  )
})

export default Dice

const styles = StyleSheet.create({
    flexRow : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
    },
    pileIcon : {
        width : 35,
        height : 35,
    },
    diceContainer : {
        backgroundColor : "#e8c0c1",
        borderWidth : 1,
        borderRadius : 5,
        width : 60,
        height: 70,
        paddingHorizontal : 8,
        padding : 4,
        justifyContent : 'center',
        alignItems : 'center',
    },
    pileContainer : {
        paddingHorizontal : 3,
        paddingVertical : 10,
    },
    linearGradient : {
        padding : 1,
        borderWidth : 3,
        borderRightWidth : 0,
        borderColor : '#f0ce2c',
        justifyContent : 'center',
        alignItems : 'center',
    },
    dice : {
        height : 45,
        width : 45,
    }, 
    rollingDice : {
        height : 80,
        width : 80,
        position : 'absolute',
        zIndex : 90,
        top : -25,
    },
    diceGradient: {
        borderWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#f0ce2c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border1: {
        borderWidth: 3,
        borderRightWidth: 0,
        borderColor: '#f0ce2c',
    },
    border2: {
        borderWidth: 3,
        padding: 1,
        backgroundColor: '#aac8ab',
        borderRadius: 10,
        borderLeftWidth: 3,
        borderColor: '#aac8ab',
    },
})