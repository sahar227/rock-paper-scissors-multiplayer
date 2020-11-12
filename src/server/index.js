const io = require('socket.io')();
io.on('connection', client => { 
    console.log('client connected!');
 });

const port = process.env.PORT || 3000;
io.listen(port);