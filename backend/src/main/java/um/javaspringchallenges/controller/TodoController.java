package um.javaspringchallenges.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import um.javaspringchallenges.exceptions.InvalidIdException;
import um.javaspringchallenges.models.Todo;
import um.javaspringchallenges.models.dto.TodoDTO;
import um.javaspringchallenges.services.TodoService;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable String id) throws InvalidIdException {
        return todoService.getTodoById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Todo createTodo(@RequestBody TodoDTO todo) {
        return todoService.createTodo(todo);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable("id") String id, @RequestBody Todo todo) throws InvalidIdException {
        return todoService.updateTodo(id, todo);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable("id") String id) throws InvalidIdException {
        todoService.deleteTodo(id);
        return "Todo deleted successfully";
    }
}
