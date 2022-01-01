import React, { useCallback } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData,
  StyleSheet
} from 'react-native'
import AnimatedCheckbox from './animated-checkbox'
import { 
  Box, 
  HStack, 
  Text, 
  useTheme, 
  themeTools, 
  useColorModeValue,
  Icon,
  Input
} from 'native-base'
import AnimatedTaskLabel from './animated-task-label'
import SwipableView from './swipable-view'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import {PanGestureHandlerProps } from 'react-native-gesture-handler'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isEditing: boolean
  isDone: boolean,
  onToggleCheckbox?: () => void,
  onPressLabel?: () => void
  onRemove?: () => void
  onChangeSubject: (subject: string) => void
  onFinishEditing?: () => void
  onChangeCategory: () => void
  subject: string
  isLaterScreen: boolean
}

const TaskItem = (props: Props) => {
  const { isDone, onToggleCheckbox,
    subject,
    onRemove,
    onPressLabel, 
    simultaneousHandlers,
    onChangeSubject,
    onFinishEditing,
    isEditing,
    isLaterScreen,
    onChangeCategory,
  } = props
  const theme = useTheme()
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', '#00fff1')
  )
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  )

  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'black')
  )

  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  const handleChangeSubject = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    onChangeSubject && onChangeSubject(e.nativeEvent.text)
  }, [onChangeSubject])

  const screenColor = isLaterScreen ? '#242424' : '#1f223d'
  
  return (
    <SwipableView simultaneousHandlers={simultaneousHandlers}
    onSwipeLeft={onRemove}
    backView={
      <Box 
      pl={4}
      pr={8} 
      mx={1}
      py={4} 
      mb={1}
      alignItems="flex-end" 
      style={styles.item}
      justifyContent="center" 
      bg="red.500"
      >
         <Icon style={{ color: 'white' }} as={<Feather name="trash-2" />} size="sm" />
      </Box>
    }>
    <HStack 
      alignItems="center" 
      //w="full" 
      pl={4} 
      pr={8} 
      mx={1}
      py={4} 
      mb={1}
      style={styles.item}
      //bg={useColorModeValue('warmGray.50', '#1f223d')}
      bg={useColorModeValue('#f5f5f5', screenColor)}
      >
    <Box width={30} height={30} mr={3}>
      <Pressable onPress={onToggleCheckbox}>
        <AnimatedCheckbox
          highlightColor={highlightColor}
          checkmarkColor={checkmarkColor} 
          boxOutlineColor={boxStroke}
          checked={isDone}
          onCheck={onToggleCheckbox}
        />
      </Pressable>
    </Box>
    {isEditing ? (
      <Input 
      placeholder="Task" 
      value={subject} 
      variant="unstyled" 
      fontSize={16}
      px={1}
      py={0}
      autoFocus
      blurOnSubmit
      onChange={handleChangeSubject}
      onBlur={onFinishEditing}
      />
    ) : (
      <React.Fragment>
    <AnimatedTaskLabel 
      textColor={activeTextColor}
      inactiveTextColor={doneTextColor}
      strikethrough={isDone}
      onPress={onPressLabel}
    >
    {subject}
  </AnimatedTaskLabel>
    {isLaterScreen && (
      <Box width={26} height={30} ml="auto">
        <MaterialIcons onPress={onChangeCategory} name="move-to-inbox" size={30} color="white" />
      </Box>
    )}
  </React.Fragment>
    )}
    </HStack>
    </SwipableView>
  )
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
  }
})

export default TaskItem
