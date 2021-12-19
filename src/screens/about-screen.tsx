import React from 'react'
import { ScrollView, Box, Text, VStack, Image, Icon, useColorModeValue } from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import NavBar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'
import MainScreen from './main-screen'
import AnimatedColorBox from '../components/animated-color-box'

const AboutScreen = () => {
  return <MainScreen isLaterScreen={true} />
}

export default AboutScreen
