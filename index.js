//Thank you to these 5 videos:
//https://www.youtube.com/watch?v=dQw4w9WgXcQ
//https://www.youtube.com/watch?v=wxbQP1LMZsw&ab_channel=TheCodingTrain
//https://www.youtube.com/watch?v=3ls013DBcww&ab_channel=TheCodingTrain
//https://www.youtube.com/watch?v=Kw5tC5nQMRY&ab_channel=TheCodingTrain
//

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');

var peopleStreaming = 0;

server.listen(80, 'localhost', () => console.log('Listening at port 80 on localhost'));

app.use(express.static('./'));
app.use(express.json());

app.get('/api', (req, res) => {
    res.send();
});

app.post('/', (request, response) => {
    //console.log(request.body);

    if (request.body.status == 'Successful') {
        peopleStreaming++;
        io.emit('updateViewCount', {status: 'successful'});
    } else if (request.body.status == 'end') {
        peopleStreaming--;
        io.emit('updateViewCount', {status: 'successful'});
    }

    //response.json();
    /*response.json({
        message: 'Acked'
    });*/
    response.end();
});

app.post('/api', (req, res) => {
    if (req.body.request == 'getStreamCount') {
        res.send(JSON.stringify({ streamcount: peopleStreaming}));
    }
    //console.log(req.body.request);
});


io.on('connection', (socket) => {
    console.log('New Connection at: ' + socket.id);
    
    socket.on('message', (data) => {
        console.log(data);
    });

});
