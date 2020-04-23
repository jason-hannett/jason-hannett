delete from user_comments
where song_id = $1;

delete from user_likes
where song_id = $1;

delete from songs 
where song_id = $1;