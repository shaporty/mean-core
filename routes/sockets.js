module.exports = function(socket) {
    socket.on('user:join', function(data) {
        console.log("join called");
        //controllers.SiteController.welcome(socket, data);
    });
    socket.on('connect', function(data) {
        console.log("connected");
        //controllers.SiteController.aleyk(socket, data);
    });
}