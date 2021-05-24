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


}

// to set joke obj
function newJokeSet() {
    newJoke.whoseJoke = $('#whoseJokeIn').val();
    newJoke.jokeQuestion = $('#questionIn').val();
    newJoke.punchLine = $('#punchLineIn').val();
}

function addJoke() {
    console.log('clicked add ');

    if($('#whoseJokeIn').val() == '' || $('#questionIn').val() == '' || $('#punchLineIn').val() == '') {
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

function getJokes() {
    console.log('getting jokes');

    $.ajax({
        method: 'GET',
        url: '/jokes',
    }).then(function (response) {
        console.log(response);
        returnedJokes = response;

        $('#outputDiv').empty();

        returnedJokes.forEach(joke => {
            $('#outputDiv').append(`
            <li> ${joke.whoseJoke} : ${joke.jokeQuestion} <br> ${joke.punchLine}
            `)
        });



    })

}