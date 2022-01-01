import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import { PanGestureHandler, PanGestureHandlerProps, ScrollView } from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
  category: string
}

interface TaskListProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
  isLaterScreen: boolean
  onChangeCategory: (item: TaskItemData) => void
}

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
  onChangeCategory: (item: TaskItemData) => void
  isLaterScreen: boolean
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
  data,
  isEditing,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemove,
  simultaneousHandlers,
  isLaterScreen,
  onChangeCategory,
  } = props

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const handleChangeSubject = useCallback((subject) => {
    onChangeSubject(data, subject)
  }, [data, onChangeSubject])

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])

  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  const handleChangeCategory = useCallback(() => {
    onChangeCategory(data)
    console.log('clickeeed', data)
  }, [data, onChangeCategory])

  return (
    <StyledView w="full" from={{
      opacity: 0,
      scale: 0.5,
      marginBottom: -46
    }} animate={{
      opacity: 1,
      scale: 1,
      marginBottom: 0
    }} exit={{
      opacity: 0,
      scale: 0.5,
      marginBottom: -46
    }}>
      <TaskItem 
        simultaneousHandlers={simultaneousHandlers} 
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
        isLaterScreen={isLaterScreen}
        onChangeCategory={handleChangeCategory}
      /> 
    </StyledView>
  )
}

export default function TaskList(props: TaskListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
    isLaterScreen,
    onChangeCategory,
  } = props
  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
    {data.map(item => {
      if (isLaterScreen && item.category === 'soon') return null
      return (
      <AnimatedTaskItem 
        key={item.id}
        data={item} 
        simultaneousHandlers={refScrollView}
        isEditing={item.id === editingItemId}
        onToggleItem={onToggleItem}
        onChangeSubject={onChangeSubject}
        onFinishEditing={onFinishEditing}
        onPressLabel={onPressLabel}
        onRemove={onRemoveItem}
        isLaterScreen={isLaterScreen}
        onChangeCategory={onChangeCategory}
      />
    )})}
      </AnimatePresence>
    <View style={{ height: 250 }} />
    </StyledScrollView>
  )
}

