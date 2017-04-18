package controllers;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.QuizDAO;
import entities.Question;
import entities.Quiz;

@RestController
public class QuizController {
	
	@Autowired
	public QuizDAO quizDAO;
	
//	GET ping
	@RequestMapping(path="ping", method=RequestMethod.GET)
	public String ping(){
		return "pong";
	}
	
//	GET quizzes
	@RequestMapping(path="quizzes", method=RequestMethod.GET)
	public List<Quiz> index() {
		return quizDAO.index();
	};
//	GET quizzes/{id}
	@RequestMapping(path="quizzes/{id}", method=RequestMethod.GET)
	public Quiz show(@PathVariable int id){
		return quizDAO.show(id);
	};
//	POST quizzes
	@RequestMapping(path="quizzes", method=RequestMethod.POST)
	public Quiz create(@RequestBody String jsonQuiz, HttpServletResponse response){
			ObjectMapper mapper = new ObjectMapper();
			try {
				Quiz mappedQuiz = mapper.readValue(jsonQuiz, Quiz.class);
				return quizDAO.create(mappedQuiz);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}
//	PUT quizzes/{id}
	@RequestMapping(path="quizzes/{id}", method=RequestMethod.PUT)
	public Quiz update(@PathVariable int id, @RequestBody String jsonQuiz, HttpServletResponse response){
		ObjectMapper mapper = new ObjectMapper();
		try {
			Quiz mappedQuiz = mapper.readValue(jsonQuiz, Quiz.class);
			return quizDAO.update(id, mappedQuiz);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	};
//	DELETE quizzes/{id}
	@RequestMapping(path="quizzes/{id}", method=RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id, HttpServletResponse response){
		return quizDAO.destroy(id);
	};
	// GET quizzes/{quizId}/questions
	@RequestMapping(path="quizzes/{quizId}/questions", method=RequestMethod.GET)
	public Set<Question> showQuestions(@PathVariable int quizId) {
			return quizDAO.showQuestions(quizId);
	};
	// POST quizzes/{quizId}/questions
	@RequestMapping(path="quizzes/{quizId}/questions", method=RequestMethod.POST)
	public Question createQuestion(@PathVariable int quizId, @RequestBody String jsonQuestion, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Question mappedQuestion= mapper.readValue(jsonQuestion, Question.class);
			return quizDAO.createQuestion(quizId, mappedQuestion);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
//	public  boolean destroyQuestions(int id, int questid);
}
