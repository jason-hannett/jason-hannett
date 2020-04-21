select artist_information.artist_name, songs.title, songs.image, songs.file, user_likes.id from artist_information
join users on artist_information.artist_id = users.id
join songs on users.id = songs.user_id
join user_likes on songs.song_id = user_likes.song_id
where user_likes.user_id = $1;