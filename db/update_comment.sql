update user_comments
set comment = $2
where id = $1;