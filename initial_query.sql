drop database driverManagement;

create database driverManagement;

use driverManagement;

CREATE TABLE Driver(
	Name varchar(255) NOT NULL,
	Surname varchar(255) NOT NULL,
    Citizen_ID varchar(13) UNIQUE,
    Passport_ID varchar(255) UNIQUE,
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Username varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Birthday Date NOT NULL,
    Age int NOT NULL,
    Address varchar(255) NOT NULL,
    Phone_no varchar(255) NOT NULL,
    Role varchar(255) NOT NULL,
    Weight decimal(4,1) NOT NULL,
    Height decimal(5,2) NOT NULL,
    Congenital_disease varchar(255),
    Food_allergy varchar(255),
    Medical_allergy varchar(255),
    Blood_type enum('A','B','AB','O') NOT NULL,
    Salary int not null,
    License_no varchar(255) NOT NULL UNIQUE
    
);

CREATE TABLE Route_group(
	RGID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Destination varchar(255) NOT NULL,
    Driver_ID int  ,
    FOREIGN KEY (Driver_ID) REFERENCES Driver(ID) ON DELETE SET NULL
    
);

CREATE TABLE Student(
	Name varchar(255) NOT NULL,
	Surname varchar(255) NOT NULL,
    Citizen_ID varchar(13) UNIQUE,
    Passport_ID varchar(255) UNIQUE,
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Username varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Birthday Date NOT NULL,
    Age int NOT NULL,
    Address varchar(255) NOT NULL,
    Phone_no varchar(255) NOT NULL,
    Role varchar(255) NOT NULL,
    Weight decimal(4,1) NOT NULL,
    Height decimal(5,2) NOT NULL,
    Congenital_disease varchar(255),
    Food_allergy varchar(255),
    Medical_allergy varchar(255),
    Blood_type enum('A','B','AB','O') NOT NULL,
    Behavior_score int NOT NULL,
    Status enum( 'At Home' , 'Going to school', 'At School' , 'Studying' , 'At Nurse Office' ) NOT NULL,
    GPAX decimal(3,2),
    RGID int ,
    FOREIGN KEY (RGID) REFERENCES Route_group(RGID) ON DELETE SET NULL
    
);
-- DROP TABLE Student;
-- DROP TABLE Route_group;
-- DROP TABLE Driver;
SELECT * FROM Student;
SELECT * FROM Route_group;
SELECT * FROM Driver;

INSERT INTO Driver
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Salary, License_no)
VALUES ('Test1', 'Sur1', '1234567890123', 'test1', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 500000, 'AB1234');
INSERT INTO Driver
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Salary, License_no)
VALUES ('Test2', 'Sur2', '1234567890124', 'test2', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 500000, 'AB1235');
INSERT INTO Driver
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Salary, License_no)
VALUES ('Test3', 'Sur3', '1234567890125', 'test3', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 500000, 'AB1236');

INSERT INTO Route_group
(Destination,Driver_ID) VALUES ('chula','1');
INSERT INTO Route_group
(Destination,Driver_ID) VALUES ('paragon','2');
INSERT INTO Route_group
(Destination,Driver_ID) VALUES ('mbk','3');


INSERT INTO Student
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Behavior_score, Status)
VALUES ('Test1', 'Sur1', '1234567890123', 'test1', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 100, 'At Home');
INSERT INTO Student
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Behavior_score, Status)
VALUES ('Test2', 'Sur2', '1234567890124', 'test2', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 100, 'At Home');
INSERT INTO Student
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Behavior_score, Status)
VALUES ('Test3', 'Sur3', '1234567890125', 'test3', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 100, 'At Home');
INSERT INTO Student
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Behavior_score, Status)
VALUES ('Test4', 'Sur4', '1234567890126', 'test4', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 100, 'At Home');
INSERT INTO Student
( Name, Surname, Citizen_ID, Username, Password, Birthday, Age, Address, Phone_no, Role, Weight, Height, Blood_type, Behavior_score, Status)
VALUES ('Test5', 'Sur5', '1234567890127', 'test5', '1234', DATE '2015-12-17', 18,'PhayathaiRd', '081-1234567', 'Driver', 60, 160.0, 'A', 100, 'At Home');


-- Use Admin instead of root
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'admin'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;