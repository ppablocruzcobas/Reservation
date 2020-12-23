CREATE DATABASE IF NOT EXISTS reservation_system;
CREATE USER IF NOT EXISTS 'reservation'@'localhost' IDENTIFIED BY 'reservation';

GRANT ALL PRIVILEGES ON reservation_system.* TO 'reservation'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS Contact (
    id int not null,
    name varchar(255),
    type varchar(255),
    phone varchar(255),
    birthday DATE,
    PRIMARY KEY (id)
);

