const io = require('socket.io');
const app = require('express')();

const server = require('http').createServer(app);

const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');

const socket = require('./services/socket');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./data/models');

db.sequelize.sync();

app.use('/users', require('./routes/user'));
app.use('/messages', require('./routes/message'));

const port = config.PORT | 3000;

server.listen(port, () => {
    socket.init(io(server, { cors: { origin: '*', methods: ['GET', 'POST', 'OPTIONS'], credentials: true } }));

    console.log(`Server is running on port : ${port}`);
});
