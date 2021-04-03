import io from 'socket.io-client';
let socket;

export const initiateSocket = (uid, setItems) => {
    socket = io('http://localhost:3000', {transports: ['websocket'], upgrade: false});
    console.log(`Connecting socket...`);
    socket.emit('join', {user: uid});
}

export const getCurrentData = (setItems) => {
    socket = io('http://localhost:3000', {transports: ['websocket'], upgrade: false});
    socket.emit('requestData', {});
    socket.on('data', data => {
        setItems(Object.values(data));
        
    });
}

export const sendMove = (data) => {
    socket.emit('move', {...data});
}

