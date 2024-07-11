import {TodoToAdd} from "../models/Todo.ts";
import {ChangeEvent, FormEvent, useState} from "react";

type CreateNewTodoProps = {
    createNewTodo: (todo: TodoToAdd) => void;
}
export default function CreateNewTodo(props: Readonly<CreateNewTodoProps>) {
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.createNewTodo({ description: description});
        setDescription("");
    }
    return (<>
            <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                <label>Todo Description:
                    <input type="text" value={description}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/></label>
                <button>Edit</button>
            </form>

        </>

    )
}