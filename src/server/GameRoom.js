const fullRoomNumber = 2;

class GameRoom {
    constructor(roomName, password, client) {
        this.roomName = roomName;
        this.password = password;
        this.participants = [client];
        this.isGameStarted = false;

        client.emit('roomCreated');
    }

    isOpenForJoin() {
        return this.participants.length < fullRoomNumber && !this.isGameStarted;
    }

    joinRoom(client, password) {
        if(!isOpenForJoin()) {
            client.emit('roomAlreadyFull');
            return;
        }
        if(this.password !== password) {
            client.emit('incorrectPassword');
            return;
        }
        this.participants.push(client);
        if(this.participants.length === fullRoomNumber) {
            this.isGameStarted = true;
            for(const participant of participants)
                participant.emit('gameStarted');
        }
    }
}

module.exports = GameRoom;