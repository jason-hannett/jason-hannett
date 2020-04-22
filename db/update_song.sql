update songs 
set title = $2,
image = $3,
description = $4
where song_id = $1;