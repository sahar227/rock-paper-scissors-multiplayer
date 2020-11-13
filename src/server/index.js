const GameRoom = require('./GameRoom');
const io = require('socket.io')();

// TODO: manage gameRooms as dictionary between room id and room
const gameRooms = [];

io.on('connection', client => { 
    console.log('client connected!');

    // Handles request to create a new room
    client.on('createRoom', (roomName, password = '') => {
        const room = new GameRoom(roomName, password, client);
        gameRooms.push(room);
    });

    // Handles request for available rooms the user can join. roomNamePrefix allows users to filter for specific room.
    client.on('getAvailableRooms', (roomNamePrefix = '') => {
        client.emit('availableRooms', gameRooms.filter(gr => gr.isOpenForJoin() && gr.roomName.startsWith(roomNamePrefix)));
    });

    // Handles request to join specific room
    client.on('joinRoom', (roomName, password = '') => {
        const gameRoom = gameRooms.find(gr => gr.roomName === roomName);
        gameRoom.joinRoom(client, password);
    });
 });

const port = process.env.PORT || 3000;
io.listen(port);