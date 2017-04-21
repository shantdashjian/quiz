$(document).ready(function() {
    loadData();
})

var loadData = function() {
    $.ajax({
        type: 'GET',
        url: 'api/quizzes',
        dataType: 'json'
    }).done(function(quizzes, status) {

        listQuizzesAndShowCreateQuizButton(quizzes);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });
}

var listQuizzesAndShowCreateQuizButton = function(quizzes) {
    $('#content').empty();
    var $table = $('<table id="table" class="table table-bordered bordered">');

    var $thead = $('<thead>');
    $thead.append('<tr><th>Quiz Name</th><th class="fit">Action</th><th class="fit">Action</th><th class="fit">Action</th></tr>');
    $table.append($thead);
    var $tbody = $('<tbody>');
    quizzes.forEach(function(quiz, index, array) {
        $tbody.append('<tr><td >' + capitalizeFirstLetter(quiz.name) 
        		+ '</td><td quizId="' + quiz.id + '"></td><td quizId="' + quiz.id 
        		+ '"></td><td quizId="' + quiz.id + '"></td></tr>');
    })
    $table.append($tbody);
    $('#content').append('<div class="container">');
    $('.container').append($table);

    $($table).wrap('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
    $('#mainColumn').wrap('<div class="row"></div>');
    $('#mainColumn').prepend("<h1 class=' backgrounded bordered'>It's Quiz Time!</h1>");

    var $viewButtonCells = $('tr td:nth-child(2)');
    $viewButtonCells.each(function() {

        var $viewButton = $('<button  type="button" name="viewButton" class="btn btn-success">View</button>');
        $viewButton.attr('id', $(this).attr("quizId"));
        $(this).append($viewButton);
        $viewButton.click(function() {
            showQuiz($(this).attr('id'));
        });        
    });
    
    var $editButtonCells = $('tr td:nth-child(3)');
    $editButtonCells.each(function() {

        var $editButton = $('<button  type="button" name="editButton" class="btn btn-warning">Edit</button>');
        $editButton.attr('id', $(this).attr("quizId"));
        $(this).append($editButton);
        $editButton.click(function() {
            editQuiz($(this).attr('id'));
        });        
    });
    
    var $deleteButtonCells = $('tr td:nth-child(4)');
    $deleteButtonCells.each(function() {

        var $deleteButton = $('<button  type="button" name="deleteButton" class="btn btn-danger">Delete</button>');
        $deleteButton.attr('id', $(this).attr("quizId"));
        $(this).append($deleteButton);
        $deleteButton.click(function() {
            deleteQuiz($(this).attr('id'));
        });        
    });
    
    // Create Quiz button
    var $createQuizButton = $('<button  type="button" id="showCreateQuizButton" class="btn btn-primary">Create Quiz</button>');
    $('#mainColumn').append($createQuizButton);
    $createQuizButton.click(function() {
        showCreateQuizForm();
    });   

}

var showQuiz = function(id) {
    cleanUpAndAddMainColumn();
    $.ajax({
        type: 'GET',
        url: 'api/quizzes/' + id,
        dataType: 'json'
    }).done(function(quiz, status) {
        showQuizDetails(quiz);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });

}

var editQuiz = function(id) {
    cleanUpAndAddMainColumn();
    $.ajax({
        type: 'GET',
        url: 'api/quizzes/' + id,
        dataType: 'json'
    }).done(function(quiz, status) {
        showQuizDetailsToEdit(quiz);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });

}

var deleteQuiz = function(id) {
	var deleteQuiz = confirm("Are you sure you want to delete this quiz?");
	if (deleteQuiz) {
		
		cleanUpAndAddMainColumn();
		// DELETE quizzes/{id}
		$.ajax({
			type: 'DELETE',
			url: 'api/quizzes/' + id,
		}).done(function(quiz, status) {
			loadData();
		}).fail(function(xhr, status, error) {
			$('#content').append('<p>An Error has Occured</p>');
			addReturnButton();
		});
	}

}

var cleanUpAndAddMainColumn = function() {
    $('#content').empty();
    $('#content').append('<div id="mainContainer" class="container">');
    $('#mainContainer').empty();
    $('#mainContainer').append('<div id="mainRow" class="row"></div>')

    $('#mainRow').append('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
}

var showQuizDetails = function(quiz) {
    $('#mainColumn').append('<h1  class="backgrounded bordered">' 
    		+ capitalizeFirstLetter(quiz.name) + '</h1>');
   
	// GET quizzes/{quizId}/questions
    $.ajax({
        type: 'GET',
        url: 'api/quizzes/'+quiz.id+'/questions',
        dataType: 'json'
    }).done(function(questions, status) {
    	var $questionsRow = $('<div class="questions-row row">');

        var $questionsRowColumn = $('<div class="col-md-12">');
        
        $questionsRowColumn.append('<h4>Questions:</h4>');
        var $questionsList = $('<ol id="questions-list">');
        questions.forEach(function(question, index) {
        	$questionsList.append('<li>' + question.questionText + '</li>');
        })
        $questionsRowColumn.append($questionsList);
        $questionsRow.append($questionsRowColumn);
        $('#mainColumn').append($questionsRow);
        addReturnButton();
        
    }).fail(function(xhr, status, error) {
        $('#mainColumn').append('<p>No questions were retrieved!</p>');
        addReturnButton();
    });

}

var showQuizDetailsToEdit = function(quiz) {
	
	
	// PUT quizzes/{id}
	var $form = $('<form name="editQuizForm" id="editQuizForm">');
	$form.append('<label for="name">Quiz Name: </label>');
	$form.append('<input id="name" type="text" name="name"  size="12" value="'+quiz.name+'" required><br>');
	
	// edit button
	var $editButton = $('<input id="edit" type="submit" name="editQuizButton" class="btn btn-warning" value="Submit">');
	$form.append($editButton);
//	$createButton.click(function(event) {
	$form.submit(function(event) {
		event.preventDefault();
		if ($(editQuizForm.name).val()) {
			
			var Quiz = {
					name: $(editQuizForm.name).val()
			};
			$.ajax({
				type: "PUT",
		        url: 'api/quizzes/'+quiz.id,
				dataType: "json",
				contentType: 'application/json', //setting the request headers content-type
				data: JSON.stringify(Quiz) //the data being added to the request body
			}).done(function(Quiz, status) {
			    cleanUpAndAddMainColumn();
				confirmQuizEditted(Quiz);
			}).fail(function(xhr, status, error) {
			    cleanUpAndAddMainColumn();
				$('#mainColumn').append('<p>An Error has Occured</p>');
				addReturnButton();
			});
		} else {
			$form.prepend('<p>Please enter quiz name!</p>');

		}
	});
	
	
	$('#mainColumn').append("<h1 class='backgrounded bordered'>Edit Quiz!</h1>");
	$('#mainColumn').append($form);
	
	
}

var showCreateQuizForm = function(){
	$('#showCreateQuizButton').remove();
	$('.container').append('<div id="formRow" class="row"></div>');
	$('#formRow').append('<div class="col-md-6 col-md-offset-3 bordered form" id="formColumn"></div>');
	$('#formColumn').load('html/create-quiz-form.html', function(){		
		var $form = $('#createQuizForm');
		$form.submit(function(event) {
			event.preventDefault();
			if ($(createQuizForm.name).val()) {
				
				var Quiz = {
						name: $(createQuizForm.name).val()
				};
				$.ajax({
					type: "POST",
					url: 'api/quizzes',
					dataType: "json",
					contentType: 'application/json', //setting the request headers content-type
					data: JSON.stringify(Quiz) //the data being added to the request body
				}).done(function(Quiz, status) {
					confirmQuizAdded(Quiz);
				}).fail(function(xhr, status, error) {
					$('#content').append('<p>An Error has Occured</p>');
				});
			} else {
				$form.prepend('<p>Please enter quiz name!</p>');
				
			}
		});
		
	});
}

var confirmQuizAdded = function(Quiz) {
    loadData();
    // cleanUpAndAddMainColumn();
    // listQuizzesAndShowCreateQuizButton();
    // $('#mainColumn').append('<h2>New Quiz Added!</h2>');
    // showQuizDetails(Quiz);
}

var confirmQuizEditted = function(Quiz) {
    loadData();
    // cleanUpAndAddMainColumn();
    // listQuizzesAndShowCreateQuizButton();
    // $('#mainColumn').append('<h2>New Quiz Added!</h2>');
    // showQuizDetails(Quiz);
}

var confirmQuizDeleted = function() {
    loadData();
    // cleanUpAndAddMainColumn();
    // $('#mainColumn').append('<h2>Quiz Deleted!</h2>');
    // addReturnButton();
}

var addReturnButton = function() {
    $('#mainColumn').append('<button id="showQuizzes" type="button" name="button" class="btn btn-primary">List Quizzes</button>');
    $('#showQuizzes').click(loadData);
}
