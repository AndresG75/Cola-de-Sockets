var socket = io();
const labelTicket = document.querySelector('small');
const botonAtender = document.querySelector('#boton-ticket');

var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');

console.log(escritorio);

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


document.addEventListener('DOMContentLoaded',AtenderTicket);

botonAtender.addEventListener('click',AtenderTicket);

function AtenderTicket(){

    
socket.emit('atenderTicket', {
    escritorio: escritorio
}, function(ticketAtender) {

    if(ticketAtender === 'No hay tickets para atender.'){
        labelTicket.textContent = 'No hay tickets para atender.';
       return alert('No hay tickets para atender.');
    }
    labelTicket.textContent = ticketAtender.numero;
    console.log(ticketAtender.numero);
});

}