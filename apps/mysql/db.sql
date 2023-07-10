DROP DATABASE IF EXISTS webapp;
CREATE DATABASE webapp;

USE webapp;

DROP TABLE IF EXISTS passwdauth;
CREATE TABLE passwdauth (
    `id` varchar(100) NOT NULL,
    `hash` varchar(64) NOT NULL,
    `salt` varchar(32) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info (
    `id` varchar(100) NOT NULL,
    `name` varchar(100) NOT NULL,
    `familyname` varchar(100),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS user_binds_credentials;
CREATE TABLE user_binds_credentials (
    `id` varchar(100) NOT NULL,
    `credential_type` int UNSIGNED,
    `credential_info` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_binds_uniq` (`credential_type`, `credential_info`)
);

DROP TABLE IF EXISTS credentials_type;
CREATE TABLE credentials_type (
    `type` int UNSIGNED,
    `name` varchar(50) NOT NULL,
    PRIMARY KEY (`type`) 
);

CREATE VIEW v_userauth
AS 
    SELECT  p.hash  hash,
            p.salt  salt,
            u.id          username,
            u.name        name,
            u.familyname  familyname
    FROM passwdauth p
           INNER JOIN user_info u ON p.id = u.id;

INSERT INTO credentials_type(`type`, `name`) VALUES(1, 'email');
INSERT INTO credentials_type(`type`, `name`) VALUES(2, 'phone');
INSERT INTO credentials_type(`type`, `name`) VALUES(3, 'mobile');