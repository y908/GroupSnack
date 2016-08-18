CREATE DATABASE ratvm;
USE ratvm;

CREATE TABLE plans
(
id int NOT NULL AUTO_INCREMENT,
plan varchar(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO plans (plan) VALUES ('Banana');
