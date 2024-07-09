package um.javaspringchallenges.models.dto;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;
import um.javaspringchallenges.models.TodoStatus;

@With
@Document("todos")
public record TodoDTO(String description, TodoStatus status) {
}
