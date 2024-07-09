package um.javaspringchallenges.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.javaspringchallenges.exceptions.InvalidIDException;
import um.javaspringchallenges.models.Todo;
import um.javaspringchallenges.models.dto.TodoDTO;
import um.javaspringchallenges.services.TodoService;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() throws NullPointerException {
        return new ResponseEntity<>(todoService.getAllTodos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id) throws InvalidIDException {
        return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody TodoDTO todo) throws NullPointerException {
        return new ResponseEntity<>(todoService.createTodo(todo), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") String id, @RequestBody Todo todo) throws InvalidIDException {
        return new ResponseEntity<>(todoService.updateTodo(id, todo), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") String id) throws InvalidIDException {
        todoService.deleteTodo(id);
        return new ResponseEntity<>("Todo deleted successfully", HttpStatus.OK);
    }
}
