package um.javaspringchallenges.services;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;
import um.javaspringchallenges.exceptions.InvalidIdException;
import um.javaspringchallenges.models.Todo;
import um.javaspringchallenges.models.TodoStatus;
import um.javaspringchallenges.models.dto.TodoDTO;
import um.javaspringchallenges.repository.TodoRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class TodoServiceTest {

    private static TodoService todoService;
    //Dependencies
    private static TodoRepo mockTodoRepo;
    private static UtilService mockUtilService;
    //Test data
    private static List<Todo> testTodoList;


    @BeforeAll
    static void setUp() {
        mockTodoRepo = mock(TodoRepo.class);
        mockUtilService = mock(UtilService.class);
        todoService = new TodoService(mockTodoRepo, mockUtilService);
        testTodoList = new ArrayList<>() {{
            add(new Todo("1", "Test todo 1", TodoStatus.OPEN));
            add(new Todo("2", "Test todo 2", TodoStatus.OPEN));
            add(new Todo("3", "Test todo 3", TodoStatus.IN_PROGRESS));
            add(new Todo("4", "Test todo 4", TodoStatus.IN_PROGRESS));
            add(new Todo("5", "Test todo 5", TodoStatus.DONE));
        }};
    }

    @Test
    void getAllTodos_returnsListOfOpenTodos() {
        when(mockTodoRepo.findAll()).thenReturn(testTodoList);
        todoService.getAllTodos();

        verify(mockTodoRepo).findAll();
    }

    @Test
    void getTodoById_returnsSingleTodo_foundByGivenID() throws InvalidIdException {
        when(mockTodoRepo.findById("2")).thenReturn(Optional.of(testTodoList.get(1)));
        todoService.getTodoById("2");
        verify(mockTodoRepo).findById("2");
    }

    @Test
    void createTodo_createsANewTodo_withRandomIDAndStatusOpen() throws NullPointerException {
        TodoDTO givenTodo = new TodoDTO("I am the first test todo");
        Todo expected = new Todo("123", givenTodo.description(), TodoStatus.OPEN);
        when(mockUtilService.generateId()).thenReturn("123");
        when(mockTodoRepo.save(expected)).thenReturn(expected);
        todoService.createTodo(givenTodo);
        verify(mockTodoRepo).save(expected);
    }

    @Test
    void updateTodo_updatesExistingTodo_foundByGivenID() throws InvalidIdException {
        Todo updatedTodo = new Todo("2", "I am the first test todo and being updated", TodoStatus.OPEN);
        String updateId = "2";
        Todo expected = new Todo("2", updatedTodo.description(), updatedTodo.status());
        when(mockTodoRepo.existsById(updateId)).thenReturn(true);
        when(mockTodoRepo.findById(updateId)).thenReturn(Optional.of(expected));
        todoService.updateTodo(updateId, updatedTodo);
        verify(mockTodoRepo).save(expected);
    }

    @Test
    void deleteTodo_deletesExistingTodo_foundByGivenID() throws InvalidIdException {
        String deleteId = "2";
        Todo deleted = (new Todo("2", "Test todo 2", TodoStatus.OPEN));

        when(mockTodoRepo.existsById(deleteId)).thenReturn(true);
        when(mockTodoRepo.findById(deleteId)).thenReturn(Optional.of(deleted));
        when(mockTodoRepo.findById(deleteId)).thenReturn(Optional.of(testTodoList.get(1)));
        todoService.deleteTodo(deleteId);
        verify(mockTodoRepo, times(1)).deleteById(deleteId);
    }
}