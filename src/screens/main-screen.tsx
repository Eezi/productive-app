import React, { useState, useEffect, useCallback } from 'react'
import {
  Center,
  VStack,
  useColorModeValue,
  Fab,
  Icon,
  View
} from 'native-base'
import AnimatedColorBox from '../components/animated-color-box'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'
import TaskList from '../components/task-list'
import NavBar from '../components/navbar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Swipe left to right from the task item to remove it.',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Add the task by pressing the buttom from bottom right corner.',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'You can navigate in app by pressing the icon form top left corner.',
    done: false,
  }
]

interface Props {
  someday: boolean
}

export default function MainScreen(props: Props) {
  const { someday } = props;
  const [data, setData] = useState([])
  const [editingItemId, setIsEditingId] = useState<string | null>(null)

  const storeData = async (task: any) => {
  try {
    const jsonValue = JSON.stringify(task)
    await AsyncStorage.setItem(task.id, jsonValue)
  } catch (e) {
    console.log('AsyncStorage error [storeData]', e)
  }
}


const getData = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
    if (keys.length <= 0) {
      return setData(initialData)
    }
    const tasks = await AsyncStorage.multiGet(keys);
    return {
      todos: tasks,
      keys,
    } 
  } catch(e) {
    console.log('AsyncStorage error [getData]', e)
  }

}

const removeFromStorage = async (id: string) => {
  try {
    await AsyncStorage.removeItem(id)
  } catch(e) {
    console.log('AsyncStorage error [reomoveData]', e)
  }
}


const editStorageTask = async (task: any) => {
  try {
    const jsonValue = JSON.stringify(task)
    await AsyncStorage.setItem(task.id, jsonValue)
  } catch(e) {
    console.log('AsyncStorage error [editStorageTask]', e)
  }
}

useEffect(async() => {
  const tasks = await getData();
  const { todos, keys } = tasks;
    if (tasks !== null) {
      const tasksData = keys.map((k, index) => {
        return JSON.parse(todos[index][1])
      })

    const categoryTasks = tasksData.filter((task) => {
      if (someday) {
        return task.category === 'someday'
      }
      return task.category === 'mainTasks'
    })

    setData(categoryTasks)
    }
}, [])

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
    editStorageTask({...item, done: !item.done })
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
    editStorageTask(item)
  }, [])

  const handlePressTaskItemLabel = useCallback((item) => {
    setIsEditingId(item.id)
  }, [])

  const handleRemoveItem = useCallback((item) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
    removeFromStorage(item.id);
  }, [])

  const handleCreateTask = () => {
     const id = shortid.generate()
     const newTask = {
       id,
       subject: '',
       done: false,
       category: someday ? 'someday' : 'mainTasks',
    }
    setData([
     newTask,
     ...data
    ])
    setIsEditingId(id)
    storeData(newTask);
  }

 return (
  <AnimatedColorBox bg={useColorModeValue('warmGray.60', '#141526')} 
    w="full"
   flex={1}>
    <NavBar  />
   {/*<Masthead title="What's up, Tomi!" image={require('../assets/tech-img.jpeg')}>
   </Masthead>*/}
   <VStack 
    space={1} 
    mt="-20px" 
    borderTopLeftRadius="20px" 
    borderTopRightRadius="20px" 
    bg={useColorModeValue('warmGray.50', '#141526')}
    pt="5px"
    >
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
    icon={<Icon size="sm" fontWeight="bold" color="black" as={<AntDesign name="plus" />} />}
    colorScheme={useColorModeValue('blue', 'darkBlue')}
    bg={useColorModeValue('blue.500', '#00fff1')}
    onPress={handleCreateTask}
   />
  </AnimatedColorBox>
  )
}
