import {Todo} from "../models/Todo.ts";
import TodoCard from "../components/TodoCard.tsx";

import {GalleryList, GalleryListItem} from "../styles/TodoGallery.styled.ts";
import {useTodoContext} from "../hooks/useTodoContext.ts";

type TodoGalleryProps = {
    status: string
}

export default function TodoGallery(props: Readonly<TodoGalleryProps>) {
    const {todos} = useTodoContext();
    const todosSorted: Todo[] = todos.filter(todo => todo.status === props.status);

    return (
        <GalleryList>
            {todosSorted.map((todo) => (
                <GalleryListItem>
                    <TodoCard todo={todo} key={todo.id}/>
                </GalleryListItem>
            ))}
        </GalleryList>
    )
}