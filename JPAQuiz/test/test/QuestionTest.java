package test;

import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasProperty;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Question;
import entities.Quiz;

public class QuestionTest {

	private EntityManagerFactory entityManagerFactory = null;
	private EntityManager entityManager = null;
	private Question question = null;

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
	public void test_question_mappings() {
		question = entityManager.find(Question.class, 1);    
		
	    assertThat(question,
	        allOf(
	            hasProperty("id", is(1)),	                     
	            hasProperty("questionText", is("What is the smallest state in the US?"))          
	        )
	      );
	}
	
	@Test
	public void test_answers_association() {
		question = entityManager.find(Question.class, 1);
		int expectedOutcome = 4;
		assertEquals(expectedOutcome, question.getAnswers().size());
	}
}
