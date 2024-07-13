import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {Todo, TodoToAdd} from "../models/Todo.ts";
import axios from "axios";


type TodoContextType = {
    todos: Todo[];
    fetchTodos: () => void;
    editTodo: (todo: Todo) => void;
    createTodo: (newTodo: TodoToAdd) => void;
    deleteTodo: (id: string) => void;
}
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodoContext must be used within a TodoProvider");
    return context;
}

export const TodoProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = () => {
        axios.get<Todo[]>('/api/todo')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.error('Error fetching todos', error));
    };

    const editTodo = (todo: Todo) => {
        axios.put<Todo>('/api/todo/' + todo.id, {...todo})
            .then(response => {
                setTodos(prevTodos => prevTodos.map(item => item.id === todo.id ? response.data : item));
                fetchTodos();
            })
            .catch(error => console.error('Error updating todo', error));
    };

    const createTodo = (newTodo: TodoToAdd) => {
        axios.post<Todo>('/api/todo', {description: newTodo.description})
            .then(response => {
                setTodos(prevTodos => [...prevTodos, response.data]);
            })
            .catch(error => console.error('Error creating todo', error));
    };

    const deleteTodo = (id: string) => {
        axios.delete(`/api/todo/` + id)
            .then(() => alert(`Deleted`))
            .catch(error => console.error('Error deleting todo', error))
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <TodoContext.Provider value={{todos, fetchTodos, editTodo, createTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    );
}

