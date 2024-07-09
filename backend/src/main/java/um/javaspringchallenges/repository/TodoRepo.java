package um.javaspringchallenges.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import um.javaspringchallenges.models.Todo;

@Repository
public interface TodoRepo extends MongoRepository<Todo, String> {
}
