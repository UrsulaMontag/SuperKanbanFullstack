package um.javaspringchallenges.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import um.javaspringchallenges.exceptions.InvalidIdException;
import um.javaspringchallenges.models.Todo;
import um.javaspringchallenges.models.TodoStatus;
import um.javaspringchallenges.repository.TodoRepo;

import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private TodoRepo todoRepo;

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void getAllTodos_returnsListOfExistingTodos() throws NullPointerException {
        todoRepo.saveAll(List.of(
                (new Todo("1", "Test todo 1", TodoStatus.OPEN)),
                (new Todo("2", "Test todo 2", TodoStatus.IN_PROGRESS)),
                (new Todo("3", "Test todo 3", TodoStatus.IN_PROGRESS)),
                (new Todo("4", "Test todo 4", TodoStatus.DONE))
        ));
        try {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/todo"))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().json("""
                                 [
                                      {
                                      "id": "1",
                                      "description": "Test todo 1",
                                      "status": "OPEN"
                                      },
                                      {
                                      "id": "2",
                                      "description": "Test todo 2",
                                      "status": "IN_PROGRESS"
                                      },
                                      {
                                      "id": "3",
                                      "description": "Test todo 3",
                                      "status": "IN_PROGRESS"
                                      },
                                      {
                                      "id": "4",
                                      "description": "Test todo 4",
                                      "status": "DONE"
                                      }
                                 ]
                            """));
        } catch (NullPointerException e) {
            throw new NullPointerException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void getTodoById_returnsSingleTodo_foundById() throws InvalidIdException {
        todoRepo.saveAll(List.of(
                (new Todo("2", "Test todo 2", TodoStatus.IN_PROGRESS))
        ));
        try {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/todo/2"))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().json("""
                                      {
                                      "id": "2",
                                      "description": "Test todo 2",
                                      "status": "IN_PROGRESS"
                                      }
                            """));
        } catch (InvalidIdException e) {
            throw new InvalidIdException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void createTodo_returnsNewCreatedTodo_withRandomID() throws NullPointerException {
        Todo testTodo = new Todo("123", "Test todo 1", TodoStatus.OPEN);
        try {
            mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(asJsonString(testTodo)))
                    .andExpect(MockMvcResultMatchers.status().isCreated())
                    .andExpect(MockMvcResultMatchers.content().contentType("application/json"));
        } catch (NullPointerException e) {
            throw new NullPointerException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void updateTodo_returnsEdited_withSameID() throws Exception {
        Todo testTodo = todoRepo.save(new Todo("123", "Test todo 1", TodoStatus.OPEN));
        Todo updatedTodo = new Todo(testTodo.id(), "Updated todo", TodoStatus.OPEN);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/todo/" + testTodo.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedTodo)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"));
    }

    @Test
    void deleteTodo_returnsStringDeletedSuccessfully() throws Exception {
        Todo existingTodo = todoRepo.save(new Todo("123", "Test todo 1", TodoStatus.OPEN));
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/todo/" + existingTodo.id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Todo deleted successfully"));
    }
}