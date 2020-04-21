require('dotenv').config();
const express = require('express'),
     massive = require('massive'),
     session = require('express-session'),
     {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
     authCtrl = require('./controllers/authControllers'),
     ctrl = require('./controllers/controller')
     port = SERVER_PORT,
     app = express();

     app.use(express.json());

     app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24}
    }))

    massive({
        connectionString: CONNECTION_STRING,
        ssl: {rejectUnauthorized: false}
    }).then(db => {
        app.set('db', db);
        console.log('db connected')
    })

    //endpoints

    app.post('/api/new-artist', ctrl.addArtist)
    app.post('/api/new-song', ctrl.addSong)
    app.post('/api/like-song/:song_id', ctrl.likeSong)
    app.post('/api/comment/:song_id', ctrl.addComment)
    app.get('/api/all-songs', ctrl.getAllSongs)
    app.get('/api/all-liked-songs/:id', ctrl.getAllLikes)
    app.get('/api/song/:song_id', ctrl.getSong)
    app.get('/api/comments/:song_id', ctrl.getAllComments)
    app.delete('/api/unlike/:song_id', ctrl.unlikeSong)
    app.delete('/api/delete-comment/:id', ctrl.deleteComment)
    app.put('/api/update-comment/:id', ctrl.updateComment)

     //auth endpoints 
     app.post('/api/register', authCtrl.register)
     app.post('/api/login', authCtrl.login)
     app.get('/api/logout', authCtrl.logout)

     app.listen(port, () => console.log(`server is thoomin on ${SERVER_PORT}`))
