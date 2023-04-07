class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBoxId = $(`${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function (socket) {
            console.log('connection handler connected on client side');
        });
        self.socket.emit('join_room' , {
            user_email: self.userEmail,
            chatroom: 'socialmash'
        })

        self.socket.on ('user_joined', function (data){
            console.log('a user joined' , data);
        });
    }
}
