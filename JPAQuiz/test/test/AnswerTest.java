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

import entities.Answer;
import entities.Question;

public class AnswerTest {

	private EntityManagerFactory entityManagerFactory = null;
	private EntityManager entityManager = null;
	private Answer answer = null;

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
		answer = entityManager.find(Answer.class, 1);    
		
	    assertThat(answer,
	        allOf(
	            hasProperty("id", is(1)),	                     
	            hasProperty("answerText", is("Deleware")),
	            hasProperty("correct", is(false))
	            
	        )
	      );
	}
	
	
}
