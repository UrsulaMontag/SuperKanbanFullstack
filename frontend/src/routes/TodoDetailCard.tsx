import {Todo} from "../models/Todo.ts";
import {Params, useParams} from "react-router-dom";
import TodoCard from "../components/TodoCard.tsx";

type TodoDetailCardProps = {
    todos: Todo[],
}

export default function TodoDetailCard(props: Readonly<TodoDetailCardProps>) {

    const urlParams: Readonly<Params<string>> = useParams();
    const currentTodo: Todo | undefined = props.todos.find(todo => todo.id === urlParams.id)

    return (
        <>
            {
                currentTodo
                    ? <TodoCard todo={currentTodo}/>
                    : <p>Todo not found</p>
            }
        </>

    )
}