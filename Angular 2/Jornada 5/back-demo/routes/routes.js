var appRouter = function(app) {

    var postsMock = [
        {"id": 1, "title": "Post A", "content": "Post A Content"},
        {"id": 2, "title": "Post B", "content": "Post B Content"},
        {"id": 3, "title": "Post C", "content": "Post C Content"}
    ];

    var commentsMock = [
        { "id": 1, "user": "dummy 1", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 12:15:03" },
        { "id": 2, "user": "dummy 2", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 13:15:03" },
        { "id": 3, "user": "dummy 3", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 14:15:03" },
        { "id": 4, "user": "dummy 4", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 15:15:03" },
        { "id": 5, "user": "dummy 5", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 16:15:03" },
        { "id": 6, "user": "dummy 6", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 17:15:03" },
        { "id": 7, "user": "dummy 7", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-22 18:15:03" }
    ];

    var postsNewMock = [
        {"id": 1000, "title": "Post New", "Content": "Post NEW Content"}
    ];

    var commentNewMock = [
        { "id": 1000, "user": "dummy 3", "comment": "Bla bla bla bla bla bla bla", "datetime": "2016-11-23 12:15:03" },
    ];

    app.get("/post", function(req, res) {
        res.send( postsMock );
    });

    app.get("/post/:id", function(req, res) {
        var id = req.params.id;
        res.send( postsMock[id] );
    });

    app.post("/post", function(req, res) {
        res.send( postsNewMock );
    });

    app.delete("/post/:id", function(req, res) {
        res.send( {} );
    });

    app.get("/comment", function(req, res) {
        res.send( commentsMock );
    });

    app.get("/comment/:id", function(req, res) {
        var id = req.params.id;
        res.send( commentsMock[id] );
    });

    app.post("/comment", function(req, res) {
        res.send( commentNewMock );
    });

    app.delete("/comment/:id", function(req, res) {
        res.send( {} );
    });
}
 
module.exports = appRouter;