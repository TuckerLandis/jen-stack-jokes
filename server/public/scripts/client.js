console.log('client.js sourced');

$(document).ready(onReady);

let newJoke = {};
let returnedJokes = [];

function onReady() {
    console.log('DOM ready');
    // get jokes when dom loads
    getJokes();

    // add joke when click
    $('#addJokeButton').on('click', addJoke)
    $('#outputDiv').on('click', '.badJoke', badJoke)
    $('#outputDiv').on('click', '.goodJoke', goodJoke)


}

// to set joke obj
function newJokeSet() {
    newJoke.whoseJoke = $('#whoseJokeIn').val();
    newJoke.jokeQuestion = $('#questionIn').val();
    newJoke.punchLine = $('#punchLineIn').val();
}


// checks if inputs are filled in, posts jokeObj
function addJoke() {
    console.log('clicked add ');

    if ($('#whoseJokeIn').val() == '' || $('#questionIn').val() == '' || $('#punchLineIn').val() == '') {
        alert('Please make sure all inputs are filled in');
        return;
    }

    newJokeSet();
    console.log(newJoke);

    $('input').val(''); // empty inputs

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    }).then(function (response) {
        console.log(response);
        newJoke = {}; // empty joke obj
        getJokes(); // show jokes
    })
};


// gets jokes, appends to dom as li, added buttons for removing bad jokes and laughing at good jokes
function getJokes() {
    console.log('getting jokes');

    $.ajax({
        method: 'GET',
        url: '/jokes',
    }).then(function (response) {
        console.log(response);
        returnedJokes = response;

        $('#outputDiv').empty(); // empty div

        returnedJokes.forEach(joke => {
            $('#outputDiv').append(`
            <li> ${joke.whoseJoke} : ${joke.jokeQuestion} <br> ${joke.punchLine} <br>
            <button class="badJoke">This joke isn't funny</button> 
            <button class="goodJoke">This joke is hilarious!</button> 
            </li>
            `) // end append
        }); // end loop
    }) // end then
} // end getJokes

function badJoke() {
    console.log('bad joke here');
    console.log(this);

    $(this).closest('li').remove();
}

function goodJoke() {
    console.log('good joke here');
    console.log(this);

    $(this).closest('li').append('🤣');
}