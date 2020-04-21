select * from users
join user_likes on users.id = user_likes.user_id
join songs on users.id = songs.user_id
join artist_information on users.id = artist_information.artist_id
where user_likes.user_id = $1;