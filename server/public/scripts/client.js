console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');

    // click listeners
    $(document).on('click', $('addJokeButton'), addJoke)


}

function addJoke() {
    console.log('clicked add ');
    
}