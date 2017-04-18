package entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="question")
public class Question {
	// fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="question_text")
	private String questionText;

	@OneToMany(mappedBy="question")
	private Set<Answer> answers;

	@ManyToOne
	@JoinColumn(name="quiz_id")
	private Quiz quiz;
	
	// gets and sets
	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public Set<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(Set<Answer> answers) {
		this.answers = answers;
	}

	public int getId() {
		return id;
	}

	
	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	// toString
	@Override
	public String toString() {
		return "Question [id=" + id + ", questionText=" + questionText + ", answers=" + answers + ", quiz=" + quiz
				+ "]";
	}

	
	
	
}
