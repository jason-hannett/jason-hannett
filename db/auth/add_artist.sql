insert into artist_information (
    artist_id,
    artist_name,
    profile_pic,
    age
) values (
    ${id},
    ${artist_name},
    ${profile_pic},
    ${age}
)
returning artist_id, artist_name, profile_pic, age;