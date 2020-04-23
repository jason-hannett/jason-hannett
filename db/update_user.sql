update users 
set bio = $3,
profile_pic = $2
where users.id = $1;