import {useState} from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
    // List of todo items: each has an id, text, and completed flag
    const [tasks, setTasks] = useState([]);
    // Current text typed into the "new task" input
    const [taskText, setTaskText] = useState('');

    // Create a new task from the input and append it to the list
    const addTask = () => {
        const trimmedTaskText = taskText.trim();
        if (trimmedTaskText === '') {
            Alert.alert('Empty Task', 'Please enter a task');
            return;
        }

        const newTask = {
            id: Date.now().toString(), // unique id based on the current time
            text: trimmedTaskText,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setTaskText(''); // clear the input after adding
    };

    // Mark a task as done or not done when its checkbox/text is pressed
    const toggleTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    };

    // Remove a task from the list by id
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Edit a task by id (not in the lab but "best practice")
    const editTask = (id, text) => {
        setTasks(tasks.map(task => task.id === id ? {...task, text: text} : task));
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#f0f0f0',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 20,
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        taskItem: {
            flexDirection: 'row', // text, checkbox, and delete button in one row
            alignItems: 'center',
            marginBottom: 10,
            padding: 10,
            backgroundColor: '#fff',
        },
        taskText: {
            flex: 1,
            fontSize: 16,
            marginRight: 10,
        },
        taskTextDone: {
            textDecorationLine: 'line-through',
            color: '#888',
        },
        checkbox: {
            fontSize: 20,
            marginRight: 10,
        },
        deleteButton: {
            fontSize: 20,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            {/* Controlled input: value comes from state, typing updates state */}
            <TextInput
                style={styles.input}
                placeholder="Add a new task"
                value={taskText}
                onChangeText={setTaskText}
            />
            <Button title="Add" onPress={addTask} />
            {/* Renders each task as a row with text, checkbox, and delete */}
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View style={styles.taskItem}>
                        <Text
                            style={[styles.taskText, item.completed && styles.taskTextDone]}
                            onPress={() => toggleTask(item.id)}
                        >
                            {item.text}
                        </Text>
                        <TouchableOpacity onPress={() => toggleTask(item.id)}>
                            <Text style={styles.checkbox}>
                                {item.completed ? '☑️' : '⬜'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text style={styles.deleteButton}>🗑️</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => editTask(item.id, item.text)}>
                            <Text style={styles.editButton}>✏️</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default App;

// ways to  improve the code:
// 1. add a way to edit a task
// 2. add a way to filter tasks by completed/not completed
// 3. add a way to sort tasks by text/completed
// 4. add a way to search tasks by text
// 5. add a way to clear all tasks
// 6. add a way to save tasks to a file
// 7. add a way to load tasks from a file
// 8. add a way to delete all tasks
// 9. add a way to delete all completed tasks
