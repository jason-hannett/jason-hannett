require('dotenv').config();
const express = require('express'),
     massive = require('massive'),
     session = require('express-session'),
     aws = require('aws-sdk'),
     path = require('path'),
     {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env,
     authCtrl = require('./controllers/authControllers'),
     ctrl = require('./controllers/controller'),
     port = SERVER_PORT,
     app = express();

     app.use(express.json());
     app.use(express.static(`${__dirname}/../build`));

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

    //AMAZON S3

    app.get('/api/signs3', (req, res) => {
        console.log('hit', req.query)
        aws.config = {
          region: 'us-west-1',
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        };
      
        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        console.log(fileName, fileType)
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
          Expires: 60,
          ContentType: fileType,
          ACL: 'public-read',
        };
      
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
          if (err) {
            console.log(err);
            return res.end();
          }
          const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
          };
      
          return res.send(returnData);
        });
      });

    //endpoints

    app.post('/api/new-artist', ctrl.addArtist)
    app.post('/api/new-song', ctrl.addSong)
    app.post('/api/like-song/:song_id', ctrl.likeSong)
    app.post('/api/comment/:song_id', ctrl.addComment)
    app.get('/api/all-songs', ctrl.getAllSongs)
    app.get('/api/all-liked-songs/:id', ctrl.getAllLikes)
    app.get('/api/song/:song_id', ctrl.getSong)
    app.get('/api/user-songs/:id', ctrl.getUserSongs)
    app.get('/api/comments/:song_id', ctrl.getAllComments)
    app.delete('/api/unlike/:id', ctrl.unlikeSong)
    app.delete('/api/delete-comment/:id', ctrl.deleteComment)
    app.delete('/api/delete-song/:song_id', ctrl.deleteSong)
    app.put('/api/update-comment/:id', ctrl.updateComment)
    app.put('/api/update-song/:song_id', ctrl.updateSong)
    app.put('/api/update-user/:id', ctrl.updateUser)

     //auth endpoints 
     app.post('/api/register', authCtrl.register)
     app.post('/api/login', authCtrl.login)
     app.get('/api/logout', authCtrl.logout)

     app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../build/index.html"));
    });

     app.listen(port, () => console.log(`server is thoomin on ${SERVER_PORT}`))
