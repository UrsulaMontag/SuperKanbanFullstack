package um.javaspringchallenges.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.javaspringchallenges.exceptions.InvalidIdException;
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

    public List<Todo> getAllTodos() {
        return todos.findAll();
    }

    public Todo getTodoById(String id) throws InvalidIdException {
        return todos.findById(id).orElseThrow(() -> new InvalidIdException("Todo not found!"));
    }

    public Todo createTodo(TodoDTO todo) {
        Todo todoToCreate = new Todo(utilService.generateId(), todo.description(), TodoStatus.OPEN);
        return todos.save(todoToCreate);
    }

    public Todo updateTodo(String id, Todo todo) throws InvalidIdException {
        Todo foundTodo = todos.findById(id).orElseThrow(() -> new InvalidIdException("Todo not found!"));
        Todo todoToUpdate = foundTodo.withDescription(todo.description()).withStatus(todo.status());
        return todos.save(todoToUpdate);
    }

    public void deleteTodo(String id) throws InvalidIdException {
        if (todos.existsById(id)) todos.deleteById(id);
        else throw new InvalidIdException("Did you delete this earlier?");
    }
}
