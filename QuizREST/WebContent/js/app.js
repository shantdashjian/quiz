$(document).ready(function() {
    loadData();
})

var loadData = function() {
    $.ajax({
        type: 'GET',
        url: 'api/quizzes',
        dataType: 'json'
    }).done(function(quizzes, status) {

        buildTableAndCreateForm(quizzes);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
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

var buildTableAndCreateForm = function(quizzes) {
    $('#content').empty();
    var $table = $('<table id="table" class="table table-bordered bordered">');

    var $thead = $('<thead>');
    $thead.append('<tr><th>Quiz Name</th><th class="fit">Action</th></tr>');
    $table.append($thead);
    var $tbody = $('<tbody>');
    quizzes.forEach(function(quiz, index, array) {
        $tbody.append('<tr><td >' + capitalizeFirstLetter(quiz.name) 
        		+ '</td><td quizId="' + quiz.id + '"></td></tr>');
    })
    $table.append($tbody);
    $('#content').append('<div class="container">');
    $('.container').append($table);

    $($table).wrap('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
    $('#mainColumn').wrap('<div class="row"></div>');
    $('#mainColumn').prepend("<h1 class=' backgrounded bordered'>It's Quiz Time!</h1>");

    var $viewButtonCells = $('tr td:nth-child(2)');
    $viewButtonCells.each(function() {

        var $viewButton = $('<button  type="button" name="button" class="btn btn-primary">View</button>');
        $viewButton.attr('id', $(this).attr("quizId"));
        $(this).append($viewButton);
        $viewButton.click(function() {
            showQuiz($(this).attr('id'));
        });        
    });


//    var $form = $('<form name="createForm" id="createForm">');
//    $form.append('<input id="pokeId" type="number" name="pokeId"  size="12" min="1" placeholder="Pokemon ID"><br>');
//    $form.append('<input id="name" type="text" name="name"  size="12" placeholder="Name"><br>');
//    $form.append('<input id="height" type="number" name="height"  size="6" min="1" placeholder="Height"><br>');
//    $form.append('<input id="weight" type="number" name="weight"  size="6" min="1" placeholder="Weight"><br>');
//    $form.append('<input id="img" type="text" name="img"  size="60" placeholder="Image URL"><br>');
//    $form.append('<textarea id="description" name="description"  cols="40" rows="4" placeholder="Description"></textarea><br>');
//
//    // create button
//    var $createButton = $('<input id="create" type="submit" name="create" class="btn btn-primary" value="Create">');
//    $form.append($createButton);
//    $createButton.click(function(event) {
//        event.preventDefault();
//        var pokemon = {
//            pokeId: $(createForm.pokeId).val(),
//            name: $(createForm.name).val(),
//            height: $(createForm.height).val(),
//            height: $(createForm.weight).val(),
//            img: $(createForm.img).val(),
//            description: $(createForm.description).val()
//        };
//        $.ajax({
//            type: "POST",
//            url: "http://52.25.225.137:8080/pokemon/data/poke/",
//            dataType: "json",
//            contentType: 'application/json', //setting the request headers content-type
//            data: JSON.stringify(pokemon) //the data being added to the request body
//        }).done(function(pokemon, status) {
//            confirmPokemonAdded(pokemon);
//        }).fail(function(xhr, status, error) {
//            $('#content').append('<p>An Error has Occured</p>');
//        });
//    });
//
//
//    $('.container').append($form);
//    $($form).wrap('<div class="col-md-6 col-md-offset-3 bordered form" id="formColumn"></div>');
//    $('#formColumn').wrap('<div class="row"></div>');
//    $('#formColumn').prepend("<h1 class=' backgrounded bordered'>Create New Pokemon!</h1>");
}

var confirmPokemonAdded = function(pokemon) {
    loadData();
    // cleanUpAndAddMainColumn();
    // buildTableAndCreateForm();
    // $('#mainColumn').append('<h2>New Pokemon Added!</h2>');
    // showPokemonDetails(pokemon);
}

var confirmPokemonDeleted = function() {
    loadData();

    // cleanUpAndAddMainColumn();
    // $('#mainColumn').append('<h2>Pokemon Deleted!</h2>');
    // addReturnButton();
}

var addReturnButton = function() {
    $('#mainColumn').append('<button id="showQuizzes" type="button" name="button" class="btn btn-primary">List Quizzes</button>');
    $('#showQuizzes').click(loadData);
}
