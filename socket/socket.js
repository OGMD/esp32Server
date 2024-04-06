
const socket = (socketIO, server) => {
    var clientState = false;
    const io = socketIO(server, {
        //Si se usa el backend separado del frontend
        //se puede omitir la definicion del origen del cors
        //al usar un proxy en la configuracion del cliente

      /*  cors:{
            origin:"http://localhost:5173",
            methods:["GET","POST"]
        } */
        cors:{
            origin:'*',
            methods:["GET","POST"]
        }
    });
    
  //  let interval;

    function DataPrint(socket){
        if(!clientState == true){
            socket.send("No data for you sorry, check your credentials");
        }else{
            console.log('A new client Connected!');
            console.log(socket.id);
            socket.send('Welcome New Client!');
            var today = new Date().toLocaleString('es-Mx',{timeZone: 'America/Mexico_City',});
           // var user = socket.handshake.headers.authorization;
            console.log(today);
            socket.emit("date",today);
       
        }
    }
//simply auth code for sockets
  /* io.use((socket,next) => {
        var user = socket.handshake.headers['authorization'];
        console.log(socket.handshake);
        if(user == "ogmd"){
            console.log(`Authenticated: ${user}`);
            next()
        }else{
            console.log(`No Authenticated: ${user}`);
            next(new Error())
        }
    })*/
    
    io.on("connection", (socket) => {
        clientState = true;
        DataPrint(socket);
        console.log("a new client connected");
    

        socket.on('event_name', (data) => {
            var dt = JSON.stringify(data);
            console.log(`message: ${dt}`);
            io.emit('infoEsp32',dt);
        })
   /*     if(interval){
            clearInterval(interval)
        }
        interval = setInterval(() => {
            getAPIandEmit(socket),100;
        })*/
        socket.on('sens_Data', (data) => {
            var dt = JSON.stringify(data);
            console.log(`message: ${dt}`);
            io.emit('sensClientData',dt);
        })
        socket.on("disconnected", () => {
            console.log("Client disconnected");
           // clearInterval(interval);
            clientState = false;
        })
      /*  socket.on('ping',(data) => {
            console.log(data)
            io.emit("pong",data);
            io.emit('sens1',"VALOR:34");
        })
        socket.on('ButtonMain',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('ButtonMain',data);
        })*/
        socket.on('OnMachine',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OnLed',data);
        })
        socket.on('OffMachine',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OffLed',data);
        })
        socket.on('OnElevador',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OnIBT2L',data);
        })
        socket.on('OffElevador',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OnIBT2R',data);
        })
        socket.on('OffEl',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OffIBT2',data);
        })
        socket.on('OnSpin',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OnSpinIBT',data);
        })
        socket.on('OffSpin',(data) => {
            console.log(`ButtonState: ${data}`);
            io.emit('OffSpinIBT',data);
        })
        socket.on('vueltas',(data) => {
            console.log(`Vueltas: ${data}`);
            io.emit('NumVueltas',data);
        })
    })
  /*  
    const getAPIandEmit = socket => {
        const response = new Date();
        socket.emit("FromApi", response);
    };*/

}


module.exports = socket;