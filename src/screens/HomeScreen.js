import { Alert, Image, Pressable, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import GradientButton from '../components/GradientButton'
import LottieView from 'lottie-react-native'
import Witch from '../assets/animation/witch.json'
import { playBackgroundSound, playSound, stopBackgroundSound } from '../helpers/SoundUtility.js'
// import { navigate } from '../helpers/NavigationUtil.js'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPositions } from '../redux/reducers/gameSelectors.js'
import { resetGame } from '../redux/reducers/gameSlice.js'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const currentPosition = useSelector(selectCurrentPositions);

  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current
  const scaleXAnim = useRef(new Animated.Value(-1)).current
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(()=>{
    const loopAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(witchAnim , {
              toValue : deviceWidth * 0.02,
              duration : 2000,
              useNativeDriver : true
            }),
            Animated.timing(scaleXAnim , {
              toValue : -1,
              duration : 2000,
              useNativeDriver : true
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim , {
              toValue : deviceWidth * 2,
              duration : 8000,
              useNativeDriver : true
            }),
            Animated.timing(scaleXAnim , {
              toValue : -1,
              duration : 0,
              useNativeDriver : true
            })
          ]),
          Animated.parallel([
            Animated.timing(witchAnim , {
              toValue : deviceWidth * 0.05,
              duration : 3000,
              useNativeDriver : true
            }),
            Animated.timing(scaleXAnim , {
              toValue : 1,
              duration : 0,
              useNativeDriver : true
            })
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim , {
              toValue : -deviceWidth * 2,
              duration : 8000,
              useNativeDriver : true
            }),
            Animated.timing(scaleXAnim , {
              toValue : 1,
              duration : 0,
              useNativeDriver : true
            })
          ])
        ])
      ).start()
    }

    const cleanupAnimation = () => {
      Animated.timing(witchAnim).stop();
      Animated.timing(scaleXAnim).stop();
    }

    loopAnimation()

    return cleanupAnimation;

  } , [witchAnim , scaleXAnim])

  useEffect(() => {
    if (isFocused) {
      playBackgroundSound('home');
    } else {
      stopBackgroundSound();
    }

    return () => {
      stopBackgroundSound();
    };
  }, [isFocused]);

  const renderButton = useCallback((title , onPress) => {
    return <GradientButton title={title} onPress={onPress}/>
  } , [])

  const startGame = async(isNew = false) => {
    stopBackgroundSound();
    
    if(isNew){
      dispatch(resetGame());
    }

    navigation.navigate('LudoBoardScreen');
    playSound('game_start');
  }

  const handleNewGamePress = useCallback(()=>{
    startGame(true);
  } , [])

  const handleResumePress = useCallback(() => {
    startGame();
  } , [])

  return (
    <Wrapper style={styles.mainContainer}>
        <View style={styles.imgContainer}>
            <Image source={Logo} style={styles.img}/>
        </View>

        {currentPosition.length !== 0 && renderButton('RESUME' , handleResumePress)}
        {renderButton('NEW GAME' , handleNewGamePress)}
        {renderButton('VS CPU' , () => Alert.alert('Coming Soon , Click New Game'))}
        {renderButton('2 VS 2', () => Alert.alert('Coming Soon , Click New Game'))}

        <Animated.View 
          style = {[
            styles.witchContainer , 
            {
              transform : [{translateX : witchAnim} , {scaleX : scaleXAnim}],
            }
          ]}
        >
          <Pressable 
            onPress={() => {
              const random = Math.floor(Math.random() * 3) + 1;
              // playSound(`girl2`);
              playSound(`girl${random}`);
            }}
          >
            <LottieView
              hardwareAccelerationAndroid
              source = {Witch}
              autoPlay
              speed={1}
              style={styles.witch}
            />
          </Pressable>
        </Animated.View>

        <Text style={styles.artist}>Made By - Prakash Prasad</Text>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        justifyContent : 'flex-start'
    },
    imgContainer : {
        width : deviceWidth * 0.6,
        height : deviceHeight * 0.12,
        alignItems : 'center',
        justifyContent : 'center',
        marginVertical : 40,
        alignSelf : 'center'
    },
    img : {
        width : '100%',
        height : '100%',
        resizeMode : 'contain'
    },
    artist : {
      position : 'absolute',
      bottom : 40,
      color : 'white',
      fontWeight : 800,
      opacity : 0.5,
    },
    witchContainer : {
      position : 'absolute',
      top : '60%',
      left : '24%'
    },
    witch : {
      height : 250,
      width : 250,
      transform : [{rotate : '25deg'}]
    }
})


export default HomeScreen;