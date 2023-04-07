
module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: 'http://localhost:8000',
        },
    });

    io.sockets.on('connection', function (socket) {class ChatEngine {
        constructor(chatBoxId, userEmail){
            this.chatBox = $(`#${chatBoxId}`);
            this.userEmail = userEmail;

            this.socket = io.connect('http://localhost:5000');

            if (this.userEmail){
                this.connectionHandler();
            }

        }



        connectionHandler() {
            let self = this;
            this.socket.on('connect', function() {
                console.log('connection handler connected on client side');
                self.socket.emit('join_room' , {
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                })

                self.socket.on('user_joined', function (data){
                    console.log('a user joined' , data);
                });

            });

            $('#send-message').click(function(){
                let msg = $('#chat-message-input').val();

                if (msg != ''){
                    self.socket.emit('send_message', {
                        message: msg,
                        user_email: self.userEmail,
                        chatroom: 'codeial'
                    });
                }
            });

            self.socket.on('receive_message', function(data){
                console.log('message received', data.message);

                let newMessage = $('<li>');

                let messageType = 'other-message';

                if (data.user_email == self.userEmail){
                    messageType = 'self-message';
                }

                newMessage.append($('<span>', {
                    'html': data.message
                }));

                newMessage.append($('<sub>', {
                    'html': data.user_email
                }));

                newMessage.addClass(messageType);

                $('#chat-messages-list').append(newMessage);
            })
        }
    }

        console.log('new connection received on server side', socket.id);

        socket.on( 'disconnect', function (){
            console.log('server side disconnect , socket disconnected');
        });

        socket.on('join_room', function (data){
            console.log('join room request ' , data);
            socket.join(data.chatroom);
            io.in(data.cahtroom).emit('user_joined' , data);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
};
