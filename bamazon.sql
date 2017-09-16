DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  sushi_type VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);



INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("tuna poke", "poke bowls", 15, 20);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("volcano poke", "poke bowls", 13, 15);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("spicy shrim poke", "poke bowls", 13, 20);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("lobster taco", "sushi tacos", 16, 30);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("salmon taco", "sushi tacos", 9, 40);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("tuna taco", "sushi tacos", 10, 35);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("salmon and crab", "sushi burrito", 12, 30);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("tuna and salmon", "sushi burrito", 13, 25);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("salmon and shrimp tempura", "sushi burrito", 14, 20);

INSERT INTO products (product_name, sushi_type, price, stock_quantity)
VALUES ("spicy tuna and mango", "sushi burrito", 14, 25);


SELECT * FROM products;
