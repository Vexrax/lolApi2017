var socket = io();
console.log("data emitted");
socket.emit("getMatchHistory", "");
socket.on("matchHistory", function(data, data2) {
    console.log(data2);
});
