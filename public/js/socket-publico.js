var socket = io();

const ticket1 = document.querySelector('#lblTicket1');
const ticket2 = document.querySelector('#lblTicket2');
const ticket3 = document.querySelector('#lblTicket3');
const ticket4 = document.querySelector('#lblTicket4');


const escritorio1 = document.querySelector('#lblEscritorio1');
const escritorio2 = document.querySelector('#lblEscritorio2');
const escritorio3 = document.querySelector('#lblEscritorio3');
const escritorio4 = document.querySelector('#lblEscritorio4');

let tickets = [ticket1,ticket2,ticket3,ticket4];
let escritorios = [escritorio1,escritorio2,escritorio3,escritorio4];

var audio = new Audio('audio/new-ticket.mp3');
socket.on('emitirSiguiente',(data)=>{
    // console.log(data);
    audio.play();

    renderizar(data.ultimos4);
})

socket.on('atenderTicket',(data)=>{
    audio.play();

    renderizar(data);
});

function renderizar(data){
    for (let i = 0; i < data.length; i++) {

        tickets[i].textContent = `Ticket número ${data[i].numero}`;
        escritorios[i].textContent = `Escritorio número ${data[i].escritorio}`;

    }
}