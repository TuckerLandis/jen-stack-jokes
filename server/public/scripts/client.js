console.log('client.js sourced');

$( document ).ready( onReady );

let newJoke = {};

function onReady() {
    console.log('DOM ready');

    // click listeners
    $('#addJokeButton').on('click', addJoke)


}

function newJokeSet(){ 
    newJoke.whoseJoke = $('#whoseJokeIn').val();
    newJoke.jokeQuestion = $('#questionIn').val();
    newJoke.punchLine = $('#punchLineIn').val();
}

function addJoke() {
    console.log('clicked add ');
    newJokeSet();
    console.log(newJoke);
    

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    }).then(function (response) {
        console.log(response);
       // getJokes(); 
})
};