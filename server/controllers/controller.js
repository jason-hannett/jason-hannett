module.exports = {

    addArtist: async(req, res) => {
        const{id, artist_name, profile_pic, age} = req.body;
        const db = req.app.get('db');

        let foundArtist = await db.auth.verify_artist(artist_name);
        if (foundArtist[0]){
            return res.status(400).send('Artist name already exists')
        }

        let newArtist = await db.auth.add_artist({id, artist_name, profile_pic, age});

        req.session.artist = newArtist[0];
        res.status(201).send(req.session.artist)
    },

    addSong: (req, res) => {
        const db = req.app.get('db');
        const {id, title, file, image, description, genre} = req.body;
         console.log(req.body)
        db.add_song({id, title, file, image, description, genre})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }, 

    getAllSongs: (req, res) => {
        const db = req.app.get('db');
 
        db.get_all_songs()
        .then(song => res.status(200).send(song))
        .catch(err => res.status(500).send(err))
    }, 

    updateSong: (req, res) => {
        const db = req.app.get('db');
        const {song_id} = req.params
        const {title, image, description} = req.body
        console.log(req.body)
        console.log(req.params)
        db.update_song(song_id, title, image, description)
        .then(song => res.status(200).send(song))
        .catch(err => res.status(500).send(err))
    },

    deleteSong: (req, res) => {
        const db = req.app.get('db')
        const {song_id} = req.params
         console.log(req.params)
        db.delete_song(song_id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    getAllLikes: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params 

        db.get_all_likes(id)
        .then(song => res.status(200).send(song))
        .catch(err => res.status(500).send(err))
    },

    likeSong: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {song_id} = req.params
         console.log(req.body)
        db.like_song({id, song_id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    
    unlikeSong: (req, res) => {
        const db = req.app.get('db')
        const {song_id} = req.params
         console.log(req.params)
        db.unlike_song(song_id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    getSong: (req, res) => {
        const db = req.app.get('db');
        const {song_id} = req.params
 
        db.get_song(song_id)
        .then(song => res.status(200).send(song))
        .catch(err => res.status(500).send(err))
    },

    addComment: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {song_id} = req.params;
        const {comment} = req.body;
         console.log(req.body)
         console.log(req.session.user)
         console.log(req.params)
        db.add_comment({id, song_id, comment})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    getAllComments: (req, res) => {
        const db = req.app.get('db');
        const {song_id} = req.params 

        db.get_all_comments(song_id)
        .then(comment => res.status(200).send(comment))
        .catch(err => res.status(500).send(err))
    },

    updateComment: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params
        const {comment} = req.body
        console.log(req.body)
        console.log(req.params)
        db.update_comment(id, comment)
        .then(comment => res.status(200).send(comment))
        .catch(err => res.status(500).send(err))
    },

    deleteComment: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
         console.log(req.params)
        db.delete_comment(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    
}