create database MobileLab6

go 
use MobileLab6


CREATE TABLE Users(
     User_ID INT   IDENTITY(1,1) ,
     Username VARCHAR(50) NOT NULL,
	 Password VARCHAR(200) NOT NULL,
	 primary key(User_ID)
)

CREATE TABLE Items(
     Item_ID INT   IDENTITY(1,1) ,
     Item_name VARCHAR(50) NOT NULL,
	 Description VARCHAR(200) ,
	 Price Float NOT NULL,
	 primary key(Item_ID)
)

INSERT INTO Users(Username,Password)
VALUES 
('john.doe', 'john123'),
('mary.jane', 'mary456'),
('michael.smith', 'mike789'),
('susan.white', 'susan101'),
('david.brown', 'david202'),
('emily.jones', 'emily303'),
('daniel.martin', 'daniel404'),
('laura.wilson', 'laura505'),
('james.moore', 'james606'),
('lisa.taylor', 'lisa707'),
('robert.anderson', 'robert808'),
('patricia.thomas', 'patricia909'),
('william.jackson', 'william111'),
('jennifer.lee', 'jennifer222'),
('charles.harris', 'charles333'),
('elizabeth.young', 'elizabeth444'),
('joseph.king', 'joseph555'),
('sarah.scott', 'sarah666'),
('richard.ward', 'richard777'),
('nancy.campbell', 'nancy888');

INSERT INTO Items(Item_name,Description,Price)
VALUES 
('Laptop', 'A high-performance laptop for gaming and work', 999.99),
('Smartphone', 'A latest model smartphone with advanced features', 799.49),
('Headphones', 'Noise-cancelling wireless headphones', 199.99),
('Smartwatch', 'A smartwatch with health tracking features', 249.99),
('Bluetooth Speaker', 'Portable Bluetooth speaker with high sound quality', 89.99),
('TV', '4K UHD Smart TV with HDR support', 599.99),
('Tablet', 'A 10-inch tablet for productivity and entertainment', 399.99),
('Camera', 'Digital camera with high resolution and zoom features', 499.49),
('Keyboard', 'Mechanical keyboard with RGB lighting', 129.99),
('Mouse', 'Wireless ergonomic mouse for comfort and precision', 49.99),
('Gaming Console', 'Next-gen gaming console with exclusive games', 499.00),
('External Hard Drive', '1TB external hard drive for storage', 69.99),
('Portable Charger', 'Power bank for charging on the go', 39.99),
('Drone', 'A drone with 4K camera for aerial photography', 699.99),
('Smart Home Hub', 'Central hub to control smart devices in your home', 149.99),
('E-Reader', 'Lightweight e-reader for digital books', 129.99),
('Electric Scooter', 'Foldable electric scooter for commuting', 399.00),
('Game Controller', 'Wireless game controller for all platforms', 59.99),
('VR Headset', 'Virtual reality headset for immersive gaming experience', 299.99),
('Action Camera', 'Compact action camera for outdoor adventures', 199.00);