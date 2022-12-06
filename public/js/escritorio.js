// REFERENCIAS HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')
const span = document.querySelector('.alert')








const searchParamas = new URLSearchParams( window.location.search );

if( !searchParamas.has('escritorio') ){
    window.location='index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParamas.get('escritorio')
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;

});

socket.on('tickets-pendientes', (pendientes) => {

    if( pendientes === 0){
        lblPendientes.style.display = 'none'
        span.style.display = ''

        
    }else{
        lblPendientes.style.display = ''
        lblPendientes.innerText = pendientes
        span.style.display = 'none'

    }

})


btnAtender.addEventListener( 'click', () => {
   
    socket.emit('atender-ticket', {escritorio}, ({ ok,ticket,msg }) => {
        if(!ok){

            lblTicket.innerText = 'NADIE'
            return divAlerta.style.display = '';
        }else{
            lblTicket.innerText = 'Ticket ' + ticket.numero

        }
        
    })

    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});