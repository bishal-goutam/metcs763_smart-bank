create database smartbank_db;
use smartbank_db;

CREATE TABLE user (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      fullname VARCHAR(255),
      username VARCHAR(255) NOT NULL UNIQUE,
      address VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
  	  zip VARCHAR(255),
      phone VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      country VARCHAR(255)
    );

    CREATE TABLE customeraccount (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      balance DECIMAL(10, 2),
      user_id BIGINT NOT NULL
    );
    CREATE TABLE roles (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      role VARCHAR(255)
    );
    CREATE TABLE user_roles (
      role_id BIGINT,
      user_id BIGINT 
    );
   


    CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255),
    amount DECIMAL(10, 2),
    transaction_type ENUM('debit', 'credit'),
    balance_before DECIMAL(10, 2),
    balance_after DECIMAL(10, 2),
    FOREIGN KEY (account_id) REFERENCES customeraccount(id)
    );

   INSERT INTO roles (role) VALUES
    ("BankManager"),
    ("User");

    INSERT INTO transactions (account_id, transaction_date, description, amount, transaction_type, balance_before, balance_after)
    VALUES
    (1, '2024-11-01 10:30:00', 'Deposit', 500.00, 'credit', 1000.00, 1500.00),
    (1, '2024-11-05 14:20:00', 'Withdrawal', 200.00, 'debit', 1500.00, 1300.00),
    
    (2, '2024-11-02 11:15:00', 'Deposit', 700.00, 'credit', 1200.00, 1900.00),
    (2, '2024-11-08 09:50:00', 'Withdrawal', 150.00, 'debit', 1900.00, 1750.00),
    
    (3, '2024-11-03 15:00:00', 'Deposit', 1000.00, 'credit', 2000.00, 3000.00),
    (3, '2024-11-10 13:45:00', 'Withdrawal', 500.00, 'debit', 3000.00, 2500.00),
    
    (4, '2024-11-04 08:20:00', 'Deposit', 400.00, 'credit', 800.00, 1200.00),
    (4, '2024-11-12 10:00:00', 'Withdrawal', 200.00, 'debit', 1200.00, 1000.00),
    
    (5, '2024-11-06 16:30:00', 'Deposit', 150.00, 'credit', 900.00, 1050.00),
    (5, '2024-11-15 18:25:00', 'Withdrawal', 300.00, 'debit', 1050.00, 750.00),
    
    (6, '2024-11-07 09:30:00', 'Deposit', 600.00, 'credit', 1100.00, 1700.00),
    (6, '2024-11-17 12:15:00', 'Withdrawal', 250.00, 'debit', 1700.00, 1450.00),
    
    (7, '2024-11-08 14:50:00', 'Deposit', 200.00, 'credit', 500.00, 700.00),
    (7, '2024-11-20 19:40:00', 'Withdrawal', 100.00, 'debit', 700.00, 600.00),
    
    (8, '2024-11-09 07:30:00', 'Deposit', 800.00, 'credit', 1400.00, 2200.00),
    (8, '2024-11-22 11:00:00', 'Withdrawal', 300.00, 'debit', 2200.00, 1900.00),
    
    (9, '2024-11-10 20:00:00', 'Deposit', 550.00, 'credit', 1250.00, 1800.00),
    (9, '2024-11-25 15:10:00', 'Withdrawal', 450.00, 'debit', 1800.00, 1350.00),
    
    (10, '2024-11-11 17:45:00', 'Deposit', 1000.00, 'credit', 1500.00, 2500.00),
    (10, '2024-11-28 10:05:00', 'Withdrawal', 500.00, 'debit', 2500.00, 2000.00);

    INSERT INTO customeraccount (balance, user_id) VALUES
    (1000.00, 1),
    (2000.00, 1),
    (1500.00, 2),
    (2500.00, 2),
    (1800.00, 3),
    (2200.00, 3),
    (1900.00, 4),
    (2100.00, 4),
    (1300.00, 5),
    (1700.00, 5),
    (1400.00, 6),
    (1600.00, 6),
    (1100.00, 7),
    (1200.00, 7),
    (900.00, 8),
    (950.00, 8),
    (1050.00, 9),
    (1150.00, 9),
    (1250.00, 10),
    (1350.00, 10);

    INSERT INTO user (fullname, username, address, city, state, zip, phone, email, password, country) VALUES
    ('User 1', 'user1', '123 Main St', 'CityA', 'StateA', '10001', '123-456-0001', 'user1@example.com', 'password1', 'CountryA'),
    ('User 2', 'user2', '124 Main St', 'CityB', 'StateB', '10002', '123-456-0002', 'user2@example.com', 'password2', 'CountryB'),
    ('User 3', 'user3', '125 Main St', 'CityC', 'StateC', '10003', '123-456-0003', 'user3@example.com', 'password3', 'CountryC'),
    ('User 4', 'user4', '126 Main St', 'CityD', 'StateD', '10004', '123-456-0004', 'user4@example.com', 'password4', 'CountryD'),
    ('User 5', 'user5', '127 Main St', 'CityE', 'StateE', '10005', '123-456-0005', 'user5@example.com', 'password5', 'CountryE'),
    ('User 6', 'user6', '128 Main St', 'CityF', 'StateF', '10006', '123-456-0006', 'user6@example.com', 'password6', 'CountryF'),
    ('User 7', 'user7', '129 Main St', 'CityG', 'StateG', '10007', '123-456-0007', 'user7@example.com', 'password7', 'CountryG'),
    ('User 8', 'user8', '130 Main St', 'CityH', 'StateH', '10008', '123-456-0008', 'user8@example.com', 'password8', 'CountryH'),
    ('User 9', 'user9', '131 Main St', 'CityI', 'StateI', '10009', '123-456-0009', 'user9@example.com', 'password9', 'CountryI'),
    ('User 10', 'user10', '132 Main St', 'CityJ', 'StateJ', '10010', '123-456-0010', 'user10@example.com', 'password10', 'CountryJ');

   INSERT INTO user_roles (user_id, role_id) VALUES
    (1,1),
    (2,2),
    (3,2),
    (4,2),
    (5,2),
    (6,2),
    (7,2),
    (8,2),
    (9,2),
    (10,2);
