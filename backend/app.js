import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { clerkMiddleware, requireAuth } from "@clerk/express";
import {connectToDb} from './src/config/db.js'
import { SocketHanlder } from './src/socket/socket.index.js';
const app = express()
const port = 3000


const server = http.createServer(app)
const io = new Server(server)
app.use(clerkMiddleware())
app.use(express.json())
await connectToDb()

SocketHanlder(io)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
server.listen(port , ()=>{  
    console.log(`server listning on port ${port}`)
})
