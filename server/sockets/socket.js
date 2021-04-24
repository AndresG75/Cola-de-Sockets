const { io } = require('../server');

const { TicketControl } = require('../../server/classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente

    // client.on('nuevoTicket',(data,llamado)=>{
    //     console.log(data);
    //     let ticket = ticketControl.siguiente();
    //     console.log(ticket);
    //     llamado({ticket});
    // });

    // client.on('nuevoTicket', (data)=>{
    //     console.log(data);
    //     // llamado("Hola");
    // });

    client.on('nuevoTicket',(mensaje,llamado)=>{
        console.log(mensaje);
        let ticket = ticketControl.siguiente();
        llamado(ticket);

    });

    client.emit('emitirSiguiente',({
        actual: ticketControl.ticketActual(),
        ultimos4: ticketControl.Ultimos4()
    }));

    client.on('atenderTicket',(data,llamado)=>{
        let ticketAtender = ticketControl.atenderTicket(data.escritorio);
        console.log(`El ticket a atender en socket es: ${ticketAtender.numero}`);
        let ultimos4 = ticketControl.Ultimos4();
        console.log(`Los ultimos 4: ${ultimos4}`);
        console.log(`Ticket a atender: ${ticketAtender.numero}`);

        llamado(ticketAtender);
        client.broadcast.emit('atenderTicket',ultimos4);

    }) ;




});