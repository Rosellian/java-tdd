import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.tdd.Example;

public class ExampleTest {
    private Example example;

    @BeforeEach
    void setup() {
        example = new Example();
    }

    @Test
    void helloTest() {
        Assertions.assertEquals("Hello World!", example.hello());
    }
}
