import React from 'react'
import { ScrollView, Box, Text, VStack, Image, Icon, useColorModeValue } from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import NavBar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'
import AnimatedColorBox from '../components/animated-color-box'

const AboutScreen = () => {
  return (
    <AnimatedColorBox 
    bg={useColorModeValue('warmGray.50', 'warmGray.900')}
    w="full"
    flex={1}>
    <NavBar />
    {/*<Masthead title="About this app" image={require('../assets')}>
      <NavBar />
      </Masthead>*/}
    <ScrollView
      borderTopLeftRadius="20px"
      borderTopRightRadius="20px"
      bg={useColorModeValue('warmGray.50', '#1f223d')}
      mt="-20px"
      pt="30px"
      p={4}
    >
    <VStack flex={1} space={4}>
      <Box alignItems="center">
       <Text>About</Text>
      </Box>
    </VStack>
    </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
