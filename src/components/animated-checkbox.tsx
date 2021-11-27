import React, { useEffect, memo, useState } from 'react'
import Animated, {
  Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor 
} from 'react-native-reanimated'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'
import { StyleSheet, View, Pressable } from 'react-native'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import TaskItem from './task-item'

interface Props {
  checked?: boolean,
  highlightColor: string,
  checkmarkColor: string,
  boxOutlineColor: string,
  onCheck?: () => void,
}


const AnimtedCheckBox = (props: Props) => {
  const { 
    checked,
    highlightColor,
    checkmarkColor,
    boxOutlineColor,
    onCheck,
  } = props

  return (
    <View style={styles.container}>
      <Pressable onPress={onCheck} style={styles.checkbox}>
        <AnimatedCheckbox
          checked={checked}
          highlightColor={highlightColor}
          checkmarkColor={checkmarkColor}
          boxOutlineColor={boxOutlineColor}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  checkbox: {
    width: 35,
    height: 35
  }
})

export default AnimtedCheckBox
