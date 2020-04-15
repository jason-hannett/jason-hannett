create table users (
	id serial primary key,
	username varchar(100) not null,
	password text not null
);

create table artist_information (
	artist_id int references users(id),
	artist_name varchar(200),
	profile_pic text,
	age int
);

create table songs (
	song_id serial primary key,
	user_id int references users(id),
	title varchar(100) not null,
	file text not null,
	image text,
	description varchar(500),
	date date
);

create table user_comments (
	id serial primary key,
	song_id int references songs(song_id),
	comment varchar(200),
	date date
);

