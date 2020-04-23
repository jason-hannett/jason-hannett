select * from users
join artist_information on users.id = artist_information.artist_id
join songs on users.id = songs.user_id
where users.id = $1;