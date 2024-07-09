import {Status, Todo} from "../models/Todo.ts";
import {Params, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";

type EditTodoProps = {
    editTodo: (todo: Todo) => void;
    todos: Todo[];
}
export default function EditTodo(props: Readonly<EditTodoProps>) {
    const urlParams: Readonly<Params<string>> = useParams();
    const currentTodo: Todo | undefined = props.todos.find(todo => todo.id === urlParams.id);
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<Status>("OPEN");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        currentTodo && props.editTodo({id: currentTodo.id, description: description, status: status});
        setDescription("");
        setStatus("OPEN");
    }
    return (<>
            {currentTodo ? <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                <label>Todo Description:
                    <input type="text" value={description}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/></label>
                <label>Todo Status:
                    <select value={status}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatus((event.target.value))}>
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">Doing</option>
                        <option value="DONE">Done</option>
                    </select></label>
                <button>Edit</button>
            </form> : <p>Sorry here is no Todo to edit</p>}

        </>

    )
}