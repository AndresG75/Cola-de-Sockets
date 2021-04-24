var socket = io();

const generarTicket = document.querySelector('#generarTicket');
console.log(generarTicket);
const cargando = document.querySelector('#lblNuevoTicket');

document.addEventListener('DOMContentLoaded',()=>{
    console.log("Listo");
    socket.on('emitirSiguiente',(data)=>{
        cargando.textContent = data.actual;
    })
})

emitirSiguiente = ()=>{
    socket.emit('nuevoTicket', {
        usuario: 'Fernando',
        mensaje: 'Hola Mundo'
    }, function(resp) {
        cargando.textContent = resp;
        console.log('respuesta server: ', resp);
    });
}

// escucharActual = ()=>{
//     socket.on('emitirSiguiente',(data)=>{
//         console.log(data);
//     })
// }



socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


function llamado(siguiente){
    cargando.textContent = siguiente;
    console.log(siguiente);
}


generarTicket.addEventListener('click',emitirSiguiente)


