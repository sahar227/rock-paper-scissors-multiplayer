const TicTacToeSession = require('./TicTacToeSession');

const fullRoomNumber = 2;

class GameRoom {
    constructor(roomName, password = '', client) {
        this.roomId = client.id;
        this.roomName = roomName;
        this.password = password;
        this.participants = [client];
        this.gameSession = null;
        client.emit('roomCreated');
        client.on('disconnect', () => this.leaveRoom(client.id));
        client.on('leaveRoom', () => this.leaveRoom(client.id));
    }

    isOpenForJoin() {
        return this.participants.length < fullRoomNumber && this.participants.length > 0;
    }

    joinRoom(client, password) {
        if(!this.isOpenForJoin()) {
            client.emit('roomAlreadyFull');
            return;
        }
        if(this.password !== password) {
            client.emit('incorrectPassword');
            return;
        }

        this.participants.push(client);
        if(this.participants.length === fullRoomNumber) {
            this.startGame();
        }
    }
    startGame() {
        this.gameSession = new TicTacToeSession(this.participants);
    }

    leaveRoom(participantId) {
        this.participants = this.participants.filter(participant => participant.id !== participantId)
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