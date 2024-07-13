import {Status, Todo} from "../models/Todo.ts";
import {Link, useNavigate} from "react-router-dom";
import {useTodoContext} from "../contexts/TodoContext.tsx";
import {useState} from "react";

type TodoCardProps = {
    todo: Todo,
}

export default function TodoCard(props: Readonly<TodoCardProps>) {
    const navigate = useNavigate();
    const {editTodo, deleteTodo} = useTodoContext();
    const [status, setStatus] = useState<Status>(props.todo.status);

    const handleDelete = () => {
        deleteTodo(props.todo.id);
        navigate("/");
    }

    const handleAdvance = () => {
        let newStatus: Status;
        let statusParam: string;

        if (status === "OPEN") {
            newStatus = "IN_PROGRESS";
            statusParam = "doing";
        } else if (status === "IN_PROGRESS") {
            newStatus = "DONE";
            statusParam = "done";
        } else {
            return; // Kein weiterer Statusübergang möglich
        }

        setStatus(newStatus);
        editTodo({...props.todo, status: newStatus});
        navigate("/board/" + statusParam);
    };

    return (
        <article className="todo-card">
            <p className="todo-description">{props.todo.description}</p>
            <div className="todo-action-container">
                <Link to={`/details/${props.todo.id}`} className="link-card">Details</Link>
                <Link to={`/edit/${props.todo.id}`} className="link-card">Edit</Link>
                {props.todo.status !== "DONE"
                    ? <button className="button-card__advance" onClick={handleAdvance}>Advance</button>
                    : <button onClick={handleDelete} className="button-card__delete">Delete</button>
                }
            </div>
        </article>
    )
}