CREATE SCHEMA mindtrack DEFAULT CHARACTER SET utf8;
USE mindtrack;

-- creating table patient
CREATE TABLE mindtrack.patient(
    name VARCHAR(255) NULL,
    cpf VARCHAR(11),
    PRIMARY KEY(cpf),
	UNIQUE INDEX `cpf_UNIQUE` (cpf ASC),
    date_of_birth DATE,
    email_address VARCHAR(255),
    phone_number VARCHAR(15),
    responsible VARCHAR(255),
    address_id int,
	foreign key(address_id)
    references mindtrack.address (id)
);

-- creating table professional
CREATE TABLE mindtrack.professional(
    name VARCHAR(255) NULL,
    crp VARCHAR(11),
    PRIMARY KEY(crp),
	UNIQUE INDEX `crp_UNIQUE` (crp ASC),
    date_of_birth DATE,
    email_address VARCHAR(255),
    phone_number VARCHAR(15),
    password VARCHAR(16),
    address_id int,
    foreign key(address_id)
    references mindtrack.address (id)
);

-- creating table professional_patient
CREATE TABLE mindtrack.professional_patient(
	crp VARCHAR(11) not null,
    cpf VARCHAR(11) not null,
	FOREIGN KEY(crp)
    REFERENCES mindtrack.professional (crp),
	FOREIGN KEY(cpf)
    REFERENCES mindtrack.patient (cpf)
);

-- creating table report
CREATE TABLE mindtrack.report(
    id int PRIMARY KEY AUTO_INCREMENT,
	evolution VARCHAR(1000),
    follow_up VARCHAR(1000),
    resources VARCHAR(1000),
    crp VARCHAR(11),
    cpf VARCHAR(11),
	FOREIGN KEY(crp)
    REFERENCES mindtrack.professional (crp),
	FOREIGN KEY(cpf)
    REFERENCES mindtrack.patient (cpf)
);

-- creating table appointment
CREATE TABLE mindtrack.appointment(
    id INT PRIMARY KEY AUTO_INCREMENT,
	`date` DATETIME,
	recurrence VARCHAR(20),
    `local` VARCHAR(1000),
    in_person BOOLEAN,
    price DOUBLE,
    paid BOOLEAN,
	crp VARCHAR(11),
    cpf VARCHAR(11),
	FOREIGN KEY(crp)
    REFERENCES mindtrack.professional (crp),
	FOREIGN KEY(cpf)
    REFERENCES mindtrack.patient (cpf)
);

-- creating table address
CREATE TABLE mindtrack.address(
	id INT AUTO_INCREMENT PRIMARY KEY, 
	street VARCHAR(150),
    city VARCHAR(150),
    state VARCHAR(150),
    postal_code VARCHAR(15),
    country VARCHAR(150)
);

CREATE USER 'mindtrack'@'localhost' IDENTIFIED BY 'm1ndtr4ck123';

GRANT ALL PRIVILEGES ON * . * TO 'mindtrack'@'localhost';

FLUSH PRIVILEGES;