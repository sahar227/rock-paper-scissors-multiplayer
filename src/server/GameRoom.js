const fullRoomNumber = 2;

class GameRoom {
    constructor(roomName, password = '', client) {
        this.roomName = roomName;
        this.password = password;
        this.participants = [client];
        client.emit('roomCreated');
        client.on('discconnect', () => this.leaveRoom(client.id));
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
            for(const participant of this.participants)
                // TODO: send additional information
                participant.emit('gameStarted');
        }
    }

    leaveRoom(participantId) {
        this.participants = this.participants.filter(participant => participant.id !== participantId)
    }

    getRoomDTO() {
        return {
            roomName: this.roomName,
            isPasswordProtected: this.password.length > 0
        };
    }
}

module.exports = GameRoom;