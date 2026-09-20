import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { playSound } from '../helpers/SoundUtility';

const iconSize = RFValue(18)

const GradientButton = ({title , onPress , iconColor = '#d5be3e'}) => {
  
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnContainer}
        onPress={()=>{
          playSound('ui');
          onPress();
        }}
      >
        <LinearGradient
          colors={['#4c669f' , '#3b5998' , '#192f6a']}
          style={styles.button}
          start={{x:0 , y: 0}}
          end={{x:0 , y:1}}
        >
          {
            title === 'RESUME' ? <Ionicons name='play' color={iconColor} size={iconSize}/>
            : title === 'NEW GAME' ? <Ionicons name='play-circle' color={iconColor} size={iconSize}/>
            : title === 'VS CPU' ? <Ionicons name='desktop' color={iconColor} size={iconSize}/>
            : title === '2 VS 2' ? <Ionicons name='people' color={iconColor} size={iconSize}/>
            : title === "HOME" ? <Ionicons name='home' color={iconColor} size={iconSize}/>
            : <Ionicons name='person-4' color={iconColor} size={iconSize}/>
          }
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default GradientButton

const styles = StyleSheet.create({
    mainContainer : {
        borderRadius : 10,
        borderWidth : 2,
        borderColor : '#000',
        marginVertical : 10
    } , 
    btnContainer : {
        borderWidth : 5,
        borderRadius : 10,
        elevation : 5,
        backgroundColor : 'white',
        shadowColor : '#d5be3e',
        shadowOpacity : 0.5,
        shadowOffset : {width : 1,height : 1},
        shadowRadius : 10,
        borderColor : '#d5be3e',
        width : 220
    },
    buttonText : {
      color : 'white' , 
      fontSize : RFValue(16),
      width : '70%',
      textAlign : 'left',
      // fontFamily : 'Philosopher-Bold'
    },
    button : {
      height : 45,
      borderRadius : 2, 
      borderWidth : 2,
      borderColor : '#000',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'center',
      gap : 20
    }
})