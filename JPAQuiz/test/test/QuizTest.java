package test;

import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasProperty;
import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Quiz;

public class QuizTest {

	private EntityManagerFactory entityManagerFactory = null;
	private EntityManager entityManager = null;
	private Quiz quiz = null;

	@Before
	public void setUp() throws Exception {
		entityManagerFactory = Persistence.createEntityManagerFactory("Quiz");
		entityManager = entityManagerFactory.createEntityManager();
	}

	@After
	public void tearDown() throws Exception {
		entityManager.close();
		entityManagerFactory.close();
	}
	@Test
	public void test_quiz_mappings() {
		quiz = entityManager.find(Quiz.class, 1);    
		
	    assertThat(quiz,
	        allOf(
	            hasProperty("id", is(1)),	           
	            hasProperty("name", is("German"))           
	        )
	      );
	}
	
	@Test
	public void test_questions_association() {
		quiz = entityManager.find(Quiz.class, 10);
		int expectedOutcome = 5;
		assertEquals(expectedOutcome, quiz.getQuestions().size());
	}
}
