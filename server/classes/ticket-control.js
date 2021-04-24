const fs = require('fs');

let data = require('../data/ticket-data.json');

class Ticket{
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio
    }
};

class TicketControl{

    constructor(){
        this.hoy = new Date().getDate();
        console.log(this.hoy);
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        if(data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }else{
            this.reiniciarConteo();
        }
        
    }

    siguiente(){
        this.ultimo = this.ultimo + 1;
        let nuevoTicket = new Ticket(this.ultimo,null);
        console.log(this.ultimo);
        this.tickets.push(nuevoTicket);
        this.grabarArchivo();

        return `El siguiente ticket es: ${this.ultimo}`;
    }

    reiniciarConteo(){

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    ticketActual(){
        return `El ticket actual es: ${this.ultimo}`;
    }

    Ultimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay tickets para atender.'
        }

        let ticketAtender = this.tickets[0].numero;
        this.tickets.shift();
        let nuevoTicket = new Ticket(ticketAtender,escritorio);

        this.ultimos4.unshift(nuevoTicket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1)
        };

        console.log(this.ultimos4);
        this.grabarArchivo();

        return nuevoTicket;

    }

    grabarArchivo(){
        let newData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let newDataString = JSON.stringify(newData);
        fs.writeFileSync('./server/data/ticket-data.json',newDataString);

        console.log("Se ha guardaado el archivo");
    }
};




module.exports = {
    TicketControl
}