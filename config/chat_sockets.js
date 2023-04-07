const { disconnect } = require('mongoose');

module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: 'http://localhost:8000',
            methods: ['GET', 'POST'],
        },
    });

    io.sockets.on('connection', function (socket) {
        console.log('new connection received on server side', socket.id);

        socket.on( 'disconnect', function (){
            console.log('server side disconnect , socket disconnected');
        });

        socket.on('join_room', function (data){
            console.log('join room request ' , data);
            socket.join(data.chatroom);
            io.in(data.cahtroom).emit('user_joined' , data);
        });

    });
};
