import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, FlatList, Pressable, Modal, } from 'react-native'
import React, { useState } from 'react'


const Home = () => {

  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>(['hello world'])
  const [index, setIndex] = useState(0)
  const [updateInput, setUpdateInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);




  // addTodo
  const addTodo = () => {
    console.log(input);
    setTodo([...todo, input])
    setInput('')
  }


  // delete Todo

  const deleteTodo = (i: number) => {
    todo.splice(i, 1)
    setTodo([...todo])
  }

  const editTodo = (i: number) => {
    todo.splice(i, 1, updateInput);
    setTodo([...todo])
  }




  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Trello</Text>

      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder='enter todo'
        onFocus={() => setInput(input)}
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item, index }) => {
            return <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(index)}>
                <Text>delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.editButton} onPress={() => {
                setModalVisible(true)
              }}>
                <Text>Edit Todo</Text>
              </TouchableOpacity>
            </View>
          }}
        />

      ) : (
        <Text style={styles.noTodoText}>No Todos Found...</Text>
      )}


      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Task</Text>
              <TextInput
                style={styles.updateInput}
                onChangeText={setUpdateInput}
                value={updateInput}
              />
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  { updateInput.trim() === '' ? alert('Please enter a valid Todo') : editTodo(index); }
                  setModalVisible(false);
                }}>
                <Text style={styles.textStyle}>Todo Updated</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light Gray for the background
  },
  header: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    color: '#3498db', // Light Blue for the header
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2980b9', // Darker Blue for input border
    padding: 10,
    backgroundColor: '#ffffff', // White background for input
  },
  updateInput: {
    borderColor: '#2980b9', // Darker Blue for update input
    borderRadius: 8,
    padding: 10,
    margin: 20,
    width: 200,
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#3498db', // Light Blue for Add Todo button
    paddingVertical: 12,
    margin: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Bright Red for Delete button
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 4,
  },
  item: {
    backgroundColor: '#fff', // White for each todo item
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    color: '#2f3542', // Dark Gray for the todo text
    fontWeight: '700',
    textAlign: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#2ecc71', // Green for Edit button
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 4,
  },
  noTodoText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999', // Gray for empty state text
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF', // Light Purple for modal open
  },
  buttonClose: {
    backgroundColor: '#2196F3', // Blue for modal close
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default Home