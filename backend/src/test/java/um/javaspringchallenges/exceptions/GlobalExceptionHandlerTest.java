package um.javaspringchallenges.exceptions;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import um.javaspringchallenges.models.dto.TodoDTO;
import um.javaspringchallenges.services.TodoService;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoService todoService;

    @Test
    public void testHandleNullPointerException() throws Exception {
        // Wenn der Service mit der Fake-Datenbank (Mockito) aufgerufen wird und ein Item vom Typ DtoItem hinzugefügt
        // wird eine Exception geworfen
        Mockito.when(todoService.createTodo(Mockito.any(TodoDTO.class))).thenThrow(new NullPointerException("This is a NullPointerException"));

        // Fake-Post auf route /api/add
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\":\"testTodo\"}"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.errorMsg").value("This is a NullPointerException"))
                .andExpect(jsonPath("$.errorCode").value("INTERNAL_SERVER_ERROR"))
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.apiPath").exists());
    }

    @Test
    public void testHandleIdNotFoundException() throws Exception {
        // Wenn der Service mit der Fake-Datenbank (Mockito) aufgerufen wird und ein Item vom Typ DtoItem hinzugefügt
        // wird eine Exception geworfen
        Mockito.when(todoService.getTodoById(Mockito.any(String.class))).thenThrow(new InvalidIdException("This is a InvalidIdException"));

        // Fake-Post auf route /api/add
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todo/123"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.errorMsg").value("This is a InvalidIdException"))
                .andExpect(jsonPath("$.errorCode").value("NOT_FOUND"))
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.apiPath").exists());
    }
}