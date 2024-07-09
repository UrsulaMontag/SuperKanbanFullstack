import {Todo} from "../models/Todo.ts";
import TodoCard from "../components/TodoCard.tsx";

type TodoGalleryProps = {
    todos: Todo[]
    status: string
}

export default function TodoGallery(props: Readonly<TodoGalleryProps>) {

    const todosSorted: Todo[] = props.todos.filter(todo => todo.status === props.status);

    return (
        <ul>
            {todosSorted.map((todo) => (<TodoCard todo={todo} key={todo.id}/>))}
        </ul>
    )
}