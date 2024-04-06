const express = require('express');
const cors = require('cors');
require('dotenv').config();
const socketIO = require('socket.io');
const http = require('http');
const router = require('./router/socket.js');
const socket = require('./socket/socket.js');
/* import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import router from './router/socket.js';
import socketIO from 'socket.io'
import http from 'http' */

const app = express();
const port = process.env.PORT || 3000;
//import socket from './socket/socket.js'
app.use(router);
app.use(cors());

//socketIO const
const server = http.createServer(app);
socket(socketIO,server);


server.listen(port, () => {
    console.log(`Server on port : ${port}\nApp listening in http://localhost:${port}`)
})