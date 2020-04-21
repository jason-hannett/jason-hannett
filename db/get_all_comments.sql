select * from users
join user_comments on users.id = user_comments.user_id
where song_id = $1;

-- select * from users
-- join user_comments on users.id = user_comments.user_id;