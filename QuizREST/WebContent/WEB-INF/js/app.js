$(document).ready(function() {
    loadData();
})

var loadData = function() {
    $.ajax({
        type: 'GET',
        url: 'http://52.25.225.137:8080/pokemon/data/poke?sorted=true',
        dataType: 'json'
    }).done(function(pokemons, status) {

        buildTableAndCreateForm(pokemons);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });
}


var showPokemon = function(pokemonId) {
    cleanUpAndAddMainColumn();
    $.ajax({
        type: 'GET',
        url: 'http://52.25.225.137:8080/pokemon/data/poke/' + pokemonId,
        dataType: 'json'
    }).done(function(pokemon, status) {
        showPokemonDetails(pokemon);
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

var showPokemonDetails = function(pokemon) {


    $('#mainColumn').append('<h1  class="backgrounded bordered">' + capitalizeFirstLetter(pokemon.name) + '</h1>');
    var $detailsRow1 = $('<div class="row">');

    var $detailsRow1Column1 = $('<div class="col-md-6">');
    var $imageRow = $('<div class="row image-row">');
    var $imageColumn = $('<div class="col-md-12 image-column">');
    var $image = $('<img src="' + pokemon.img + '" alt="' + capitalizeFirstLetter(pokemon.name) + '">');
    $imageColumn.append($image);
    $imageRow.append($imageColumn);
    $detailsRow1Column1.append($imageRow);
    var $idRow = $('<div class="row id-row">');
    var $idColumn = $('<div class="col-md-12 id-column">');
    var $id = $('<p id="pokemon-id">No. ' + pokemon.pokeId + '</p>');
    $idColumn.append($id);
    $idRow.append($idColumn);
    $detailsRow1Column1.append($idRow);


    var $detailsRow1Column2 = $('<div id="details-row1-column2" class="col-md-offset-1 col-md-5">');
    var species = pokemon.types;
    var $speciesRow = $('<div class="row species-row">');
    var $speciesColumn = $('<div class="col-md-12 species-column">');
    // loop through species JS array of objects and add the name of each to the list
    $speciesColumn.append('<h4>Species:</h4>');
    var $speciesList = $('<ol id="species-list">');
    species.forEach(function(type, index) {
        $speciesList.append('<li>' + capitalizeFirstLetter(type.name) + '</li>');
    })
    $speciesColumn.append($speciesList);
    $speciesRow.append($speciesColumn);
    $detailsRow1Column2.append($speciesRow);

    // new
    var bodySpecs = [{
            type: "Ht: ",
            value: pokemon.height + "''"
        },
        {
            type: "Wt: ",
            value: pokemon.weight + " lb"
        }
    ];
    var $bodySpecsRow = $('<div class="row body-specs-row">');
    var $bodySpecsColumn = $('<div class="col-md-12 body-specs-column">');
    // loop through bodySpecs JS array of objects and add the name of each to the list
    $bodySpecsColumn.append('<h4>Body Specs:</h4>');
    var $bodySpecsList = $('<ul id="body-specs-list">');
    bodySpecs.forEach(function(bodySpec, index) {
        $bodySpecsList.append('<li>' + bodySpec.type + bodySpec.value + '</li>');
    })
    $bodySpecsColumn.append($bodySpecsList);
    $bodySpecsRow.append($bodySpecsColumn);
    $detailsRow1Column2.append($bodySpecsRow);

    var $detailsRow2 = $('<div class="row">');

    var $detailsRow2Column1 = $('<div class="col-md-12">');
    var $descriptionRow = $('<div class="row description-row">');
    var $descriptionColumn = $('<div class="col-md-12 description-column">');
    var $description = $('<p>' + pokemon.description + '</p>');
    $descriptionColumn.append($description);
    $descriptionRow.append($descriptionColumn);
    $detailsRow2Column1.append($descriptionRow);

    $('#mainColumn').append($detailsRow1);
    $detailsRow1.append($detailsRow1Column1);
    $detailsRow1.append($detailsRow1Column2);

    $('#mainColumn').append($detailsRow2);
    $detailsRow2.append($detailsRow2Column1);

    addReturnButton();

}

var buildTableAndCreateForm = function(pokemons) {
    $('#content').empty();
    var $table = $('<table id="table" class="table table-bordered bordered">');

    var $thead = $('<thead>');
    $thead.append('<tr><th class="fit">Poke ID</th><th>Name</th><th class="fit">Action</th></tr>');
    $table.append($thead);
    var $tbody = $('<tbody>');
    pokemons.forEach(function(pokemon, index, array) {
        $tbody.append('<tr><td class="fit">' + pokemon.pokeId + '</td><td pokeId="' + pokemon.pokeId + '">' + capitalizeFirstLetter(pokemon.name) + '</td><td></td></tr>');
    })
    $table.append($tbody);
    $('#content').append('<div class="container">');
    $('.container').append($table);

    $($table).wrap('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
    $('#mainColumn').wrap('<div class="row"></div>');
    $('#mainColumn').prepend("<h1 class=' backgrounded bordered'>It's a Pokemon World!</h1>");

    var $names = $('tr td:nth-child(2)');
    $names.each(function() {

        var $deleteButton = $('<button  type="button" name="button" class="btn btn-danger">Delete</button>');
        $deleteButton.attr('id', $(this).attr("pokeId"));
        $(this).next().append($deleteButton);
        $deleteButton.click(function() {
            $.ajax({
                    type: "DELETE",
                    url: "http://52.25.225.137:8080/pokemon/data/poke/" + $(this).attr('id')
                })
                .done(function() {
                    confirmPokemonDeleted();
                }).fail(function(xhr, status, error) {
                    $('#content').append('<p>An Error has Occured</p>');
                });
        });

        $(this).on('click', function() {
            showPokemon($(this).attr('pokeId'));
        });
    });


    var $form = $('<form name="createForm" id="createForm">');
    $form.append('<input id="pokeId" type="number" name="pokeId"  size="12" min="1" placeholder="Pokemon ID"><br>');
    $form.append('<input id="name" type="text" name="name"  size="12" placeholder="Name"><br>');
    $form.append('<input id="height" type="number" name="height"  size="6" min="1" placeholder="Height"><br>');
    $form.append('<input id="weight" type="number" name="weight"  size="6" min="1" placeholder="Weight"><br>');
    $form.append('<input id="img" type="text" name="img"  size="60" placeholder="Image URL"><br>');
    $form.append('<textarea id="description" name="description"  cols="40" rows="4" placeholder="Description"></textarea><br>');

    // submit button
    var $createButton = $('<input id="create" type="submit" name="create" class="btn btn-primary" value="Create">');
    $form.append($createButton);
    $createButton.click(function(event) {
        event.preventDefault();
        var pokemon = {
            pokeId: $(createForm.pokeId).val(),
            name: $(createForm.name).val(),
            height: $(createForm.height).val(),
            height: $(createForm.weight).val(),
            img: $(createForm.img).val(),
            description: $(createForm.description).val()
        };
        $.ajax({
            type: "POST",
            url: "http://52.25.225.137:8080/pokemon/data/poke/",
            dataType: "json",
            contentType: 'application/json', //setting the request headers content-type
            data: JSON.stringify(pokemon) //the data being added to the request body
        }).done(function(pokemon, status) {
            confirmPokemonAdded(pokemon);
        }).fail(function(xhr, status, error) {
            $('#content').append('<p>An Error has Occured</p>');
        });
    });


    $('.container').append($form);
    $($form).wrap('<div class="col-md-6 col-md-offset-3 bordered form" id="formColumn"></div>');
    $('#formColumn').wrap('<div class="row"></div>');
    $('#formColumn').prepend("<h1 class=' backgrounded bordered'>Create New Pokemon!</h1>");
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
    $('#mainColumn').append('<button id="showPokemons" type="button" name="button" class="btn btn-primary">Return</button>');
    $('#showPokemons').click(loadData);
}
