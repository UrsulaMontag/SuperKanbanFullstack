package um.javaspringchallenges.models;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("todos")
public record Todo(
        @Id
        String id,
        String description,
        TodoStatus status) {
}
