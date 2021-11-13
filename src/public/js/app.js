const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg){
  console.log("The backend says: ", msg)
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, backendDone);
   // event 이름 text(다양한 이름 가능) , json(다양한 오브젝트)나 함수 등 다양한 arg 무제한,..
   // function은 마지막에 와야함(함수 없어도 잘되긴함)
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
