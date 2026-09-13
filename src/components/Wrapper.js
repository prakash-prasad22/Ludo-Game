import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BG from '../assets/images/bg.jpeg'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({children , style}) => {
  return (
    <ImageBackground source={BG} resizeMode='cover' style={styles}>
        <SafeAreaView style={[styles.safeAreaView , {...style}]}>
            {children}
        </SafeAreaView>
    </ImageBackground>
  )
}

export default Wrapper

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    safeAreaView : {
        height : deviceHeight,
        width : deviceWidth,
        justifyContent : 'center',
        alignItems : 'center'
    }
})