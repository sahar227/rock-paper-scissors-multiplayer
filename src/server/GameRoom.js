const TicTacToeSession = require('./TicTacToeSession');

const fullRoomNumber = 2;

class GameRoom {
    constructor(client, roomName, password = '') {
        this.roomId = client.id;
        this.roomName = roomName;
        this.password = password;
        this.participants = [client];
        this.gameSession = null;
        client.emit('roomCreated');
        this.registerForRoomEvents(client);
    }

    registerForRoomEvents(client) {
        // when any player leaves, room is no longer active
        client.on('disconnect', () => this.participants = []);
        client.on('leaveRoom', () => this.participants = []);
    }

    isOpenForJoin() {
        return this.participants.length < fullRoomNumber && this.participants.length > 0;
    }

    joinRoom(client, password) {
        if(!this.isOpenForJoin()) {
            client.emit('error', 'Room is already full');
            return;
        }
        if(this.password !== password) {
            client.emit('error', 'Password for room is incorrect');
            return;
        }

        this.participants.push(client);
        this.registerForRoomEvents(client);
        if(this.participants.length === fullRoomNumber) {
            this.startGame();
        }
    }
    startGame() {
        this.gameSession = new TicTacToeSession(this.participants);
    }

    getRoomDTO() {
        return {
            roomId: this.roomId,
            roomName: this.roomName,
            isPasswordProtected: this.password.length > 0
        };
    }
}

module.exports = GameRoom;