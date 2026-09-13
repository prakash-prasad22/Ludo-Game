import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from "../components/Wrapper"

const LudoBoardScreen = () => {
  return (
    <Wrapper>
      <TouchableOpacity>
        
      </TouchableOpacity>
    </Wrapper>
  )
}

export default LudoBoardScreen

const styles = StyleSheet.create({
  container : {
    alignSelf : 'center',
    justifyContent : 'center',
    height : deviceHeight * 0.5,
    width : deviceWidth,
  },
  ludoBoard : {
    width : '100%',
    height : '100%',
    alignSelf : 'center',
    padding : 10
  }
})