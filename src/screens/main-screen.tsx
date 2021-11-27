import React, { useState, useCallback } from 'react'
import {
  Center,
  VStack,
  useColorModeValue,
  Fab,
  Icon
} from 'native-base'
import AnimatedColorBox from '../components/animated-color-box'
import { AntDesign } from '@expo/vector-icons'
import AnimatedCheckbox from '../components/animated-checkbox'
import TaskItem from '../components/task-item'
import Masthead from '../components/masthead'
import shortid from 'shortid'
import TaskList from '../components/task-list'
import NavBar from '../components/navbar'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Käy kaupassa',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Venyttele 30min',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Käy treenaamassa 2h',
    done: false,
  }
]


export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setIsEditingId] = useState<string | null>(null)

  const [checked, setChecked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [subject, setSubject] = useState('Task Item')
  const handleToggleTaskItem = useCallback((item) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done,
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject,
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback((item) => {
    setIsEditingId(null)
  }, [])

  const handlePressTaskItemLabel = useCallback((item) => {
    setIsEditingId(item.id)
  }, [])

  const handleRemoveItem = useCallback((item) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

 return (
  <AnimatedColorBox bg={useColorModeValue('warmGray.50', 'primary.900')} 
    w="full"
   flex={1}>
   <Masthead title="What's up, Tomi!" image={require('../assets/tech-img.jpeg')}>
    <NavBar  />
   </Masthead>
   <VStack 
    space={1} 
    mt="-20px" 
    borderTopLeftRadius="20px" 
    borderTopRightRadius="20px" 
    bg={useColorModeValue('warmGray.50', 'primary.900')}
    pt="20px">
      <TaskList 
        data={data}
        onToggleItem={handleToggleTaskItem}
        onChangeSubject={handleChangeTaskItemSubject}
        onFinishEditing={handleFinishEditingTaskItem}
        onPressLabel={handlePressTaskItemLabel}
        onRemoveItem={handleRemoveItem}
        editingItemId={editingItemId}
      />
   </VStack>
   <Fab 
    position="absolute" 
    renderInPortal={false} 
    size="sm" 
    icon={<Icon size="sm" color="white" as={<AntDesign name="plus" />} />}
    colorScheme={useColorModeValue('blue', 'darkBlue')}
    bg={useColorModeValue('blue.500', 'blue.400')}
   onPress={() => {
     const id = shortid.generate()
     setData([
       {
         id,
         subject: '',
         done: false
       },
       ...data
     ])
     setIsEditingId(id)
   }}
   />
    </AnimatedColorBox>
  )
}
