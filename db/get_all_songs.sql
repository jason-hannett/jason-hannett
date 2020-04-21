select * from users
join songs on users.id = songs.user_id
join artist_information on users.id = artist_information.artist_id;