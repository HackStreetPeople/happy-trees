drop database if exists happytrees;
create database happytrees;

DROP TABLE IF EXISTS sites; 

CREATE TABLE sites (
    Plot_ID INTEGER NOT NULL,
    Scientific_Name VARCHAR(40) NOT NULL,
    Performance_Standard_Approval VARCHAR(30) NOT NULL,
    Planted_or_Volunteer VARCHAR(30) NOT NULL,
    X_Coordinate DECIMAL NOT NULL,
    Y_Coordinate DECIMAL NOT NULL,
    MY0_Height DECIMAL NOT NULL,
    MY1_Height VARCHAR(20),
    MY2_Height VARCHAR(20),
    MY3_Height VARCHAR(20),
    MY4_Height VARCHAR(20),
    MY5_Height VARCHAR(20),
    MY6_Height VARCHAR(20),
    MY7_Height VARCHAR(20),
    MY8_Height VARCHAR(20),
    MY9_Height VARCHAR(20),
    MY10_Height VARCHAR(20),
    MY11_Height VARCHAR(20),
    MY12_Height VARCHAR(20),
    Map_ID VARCHAR(20)
) ENGINE=MyISAM DEFAULT CHARSET=utf8
