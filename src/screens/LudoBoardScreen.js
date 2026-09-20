import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from "../components/Wrapper"
import MenuIcon from '../assets/images/menu.png'
import { playSound } from '../helpers/SoundUtility'
import MenuModal from '../components/MenuModal'

const LudoBoardScreen = () => {
  const [menuVisible , setMenuVisible] = useState(false);

  const handleMenuPress = useCallback(() => {
    playSound('ui');
    setMenuVisible(true);
  } , []);

  return (
    <Wrapper>
      <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
        <Image source={MenuIcon} style={styles.menuIconImage}/>
      </TouchableOpacity>

      {menuVisible && (
        <MenuModal 
          onPressHide = {() => {setMenuVisible(false)}}
          visible = {menuVisible}
        />
      )}
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
  },
  menuIcon : {
    position : 'absolute',
    left : 20 , 
    top : 60
  }, 
  menuIconImage : {
    height : 50,
    width : 50,
    resizeMode : 'contain'
  }
})