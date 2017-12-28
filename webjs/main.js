var socket = io();
console.log("data emitted");
socket.emit("getMatchHistory", "");
socket.on("matchHistory", function(data) {
});
