package um.javaspringchallenges.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.javaspringchallenges.exceptions.InvalidIDException;
import um.javaspringchallenges.models.Todo;
import um.javaspringchallenges.models.TodoStatus;
import um.javaspringchallenges.models.dto.TodoDTO;
import um.javaspringchallenges.repository.TodoRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepo todos;
    private final UtilService utilService;

    public List<Todo> getAllTodos() throws NullPointerException {
        List<Todo> response = todos.findAll();
        if (!response.isEmpty()) return response;
        else throw new NullPointerException("No todos left for you! Enjoy your leisure!");
    }

    public Todo getTodoById(String id) throws InvalidIDException {
        return todos.findById(id).orElseThrow(() -> new InvalidIDException("No todo found!"));
    }

    public Todo createTodo(TodoDTO todo) throws NullPointerException {
        Todo todoToCreate = new Todo(utilService.generateId(), todo.description(), TodoStatus.OPEN);
        return todos.save(todoToCreate);
    }

    public Todo updateTodo(String id, Todo todo) throws NullPointerException, InvalidIDException {
        Todo todoToUpdate = null;
        if (todos.existsById(id)) {
            todoToUpdate = todos.findById(id)
                    .orElseThrow(() -> new InvalidIDException("Todo not found!"))
                    .withDescription(todo.description())
                    .withStatus(todo.status());
            todos.save(todoToUpdate);
        }
        return todoToUpdate;

    }

    public void deleteTodo(String id) throws InvalidIDException {
        if (todos.existsById(id)) todos.deleteById(id);
        else throw new InvalidIDException("Did you delete this earlier?");
    }
}
