-- hoopsdb.sql

-- Creates User table
CREATE TABLE users
(
    username varchar(16) COLLATE pg_catalog."default" NOT NULL, 
    fname varchar(16) COLLATE pg_catalog."default",
    lname varchar(16) COLLATE pg_catalog."default",
    age integer,
    address varchar(64) COLLATE pg_catalog."default",
    zip bigint,
    email varchar(128) COLLATE pg_catalog."default",
    password varchar(128) COLLATE pg_catalog."default" NOT NULL,
    PRIMARY KEY (username)  
)
TABLESPACE pg_default;

ALTER TABLE users
    OWNER to postgres;
    

-- Creates Court table
CREATE TABLE court
(
    court_id bigint NOT NULL,
    court_name varchar(64) COLLATE pg_catalog."default" NOT NULL,
    address varchar(64) COLLATE pg_catalog."default" NOT NULL,
    court_zip bigint NOT NULL,
    busiest_times varchar COLLATE pg_catalog."default",
    outdoor_status boolean,
    membership_status boolean,
    open_time double precision, 
    close_time double precision,    
    PRIMARY KEY (court_id)
)
TABLESPACE pg_default;

ALTER TABLE court
    OWNER to postgres;

    
-- Creates Amenities table
CREATE TABLE amenities
(
    amen_court_id bigint NOT NULL,
    has_fountain boolean,
    has_vending_machine boolean,
    PRIMARY KEY (amen_court_id),
    FOREIGN KEY (amen_court_id) REFERENCES court(court_id)
        ON DELETE CASCADE ON UPDATE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE amenities
    OWNER to postgres;


-- Creates Comment table
CREATE TABLE comments
(
    comment_court_id bigint NOT NULL,
    comment_username varchar(16) COLLATE pg_catalog."default" NOT NULL,
    comment_text varchar(1024) COLLATE pg_catalog."default", 
    CONSTRAINT comments_pkey 
        PRIMARY KEY (comment_court_id, comment_username),
    FOREIGN KEY (comment_court_id) REFERENCES court(court_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (comment_username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE comments
    OWNER to postgres;


-- Creates Floor Quality table
CREATE TABLE floor_quality
(
    floor_court_id bigint NOT NULL,
    court_size varchar COLLATE pg_catalog."default",
    pavement_quality varchar COLLATE pg_catalog."default",
    cleanliness varchar COLLATE pg_catalog."default",
    PRIMARY KEY (floor_court_id),
    FOREIGN KEY (floor_court_id) REFERENCES court(court_id)
        ON DELETE CASCADE ON UPDATE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE floor_quality
    OWNER to postgres;

    
-- Creates Hoop Quality table
CREATE TABLE hoop_quality
(
    hoop_court_id bigint NOT NULL,
    rim_quality varchar COLLATE pg_catalog."default",
    net_quality varchar COLLATE pg_catalog."default",
    net_type varchar COLLATE pg_catalog."default",
    hoop_height varchar COLLATE pg_catalog."default",
    PRIMARY KEY (hoop_court_id),
    FOREIGN KEY (hoop_court_id) REFERENCES court(court_id)
        ON DELETE CASCADE ON UPDATE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE hoop_quality
    OWNER to postgres;


-- Creates Rating table
CREATE TABLE rating
(
    r_court_id bigint NOT NULL,
    r_username varchar(16) COLLATE pg_catalog."default" NOT NULL,
    stars integer,
    CONSTRAINT rating_pk 
        PRIMARY KEY (r_court_id, r_username),
    FOREIGN KEY (r_court_id) REFERENCES court(court_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (r_username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE rating
    OWNER to postgres;


-- Creates Visited table
CREATE TABLE visited
(
    visited_court_id bigint NOT NULL,   -- big int not varchar
    visited_username varchar(16) COLLATE pg_catalog."default" NOT NULL,
    has_visited boolean,
    CONSTRAINT visited_pk 
        PRIMARY KEY (visited_court_id, visited_username),
    FOREIGN KEY (visited_court_id) REFERENCES court(court_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (visited_username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE visited
    OWNER to postgres;
