import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`😎Listening on http://localhost:3000😎`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done("hello from the backend");
    }, 4000);
  });
});

// const wss = new WebSocket.Server({ server }); // 웹소켓용 서버

// const sockets = []; // 모든 브라우저에 소켓을 전달하기 위해 작성

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous"
//   console.log("✅ Connected to Browser! ✅");
//   socket.on("close", () => console.log("❌Disconnected from the Browser!❌"));
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((allSocket) => allSocket.send(`${socket.nickname}: ${message.payload}`));
//       case "nickname":
//         socket["nickname"] = message.payload;
//       // sockets.forEach((allSocket) => allSocket.send(parsed.payload));
//     }
//     // 프론트에서 넘어온 소켓 메세지를 구분하여 모든 브라우저에 전달
//   });
// });

httpServer.listen(3000, handleListen); // 이렇게 하면 http, ws용 서버를 한번에 실행 가능

// app.listen(3000,handleListen);
