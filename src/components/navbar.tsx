import React, { useCallback } from 'react'
import { HStack, IconButton, Heading } from 'native-base'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useColorMode } from 'native-base'

interface Props {
  isLaterScreen: boolean
}

const NavBar = (props) => {
  const { isLaterScreen } = props
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const { colorMode } = useColorMode()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return (
    <HStack
      w="full"
      h={40}
      space={5}
      alignItems="center"
      alignContent="center"
      p={4}>
      <IconButton onPress={handlePressMenuButton} borderRadius={100}
    _icon={{
      as: Feather,
      name: 'menu',
      size: 6,
      color: colorMode === 'dark' ? 'white' : 'black'
    }}
    />
    <Heading color={colorMode === 'dark' ? 'white' : 'black'}>
     {isLaterScreen ? 'Later' : 'Soon'}
    </Heading>
      </HStack>
  )
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 22,
  }
})

export default NavBar
