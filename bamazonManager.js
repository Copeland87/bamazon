// install the following
// ('npm init')(npm install mysql)~ Hit enter 1000 times(npm install inquirer)
var inquirer = require('inquirer');
var mysql = require('mysql');

//connects to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password", //password for mysql
    database: "bamazon" //sql database name
});

connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT id, product_name, sushi_type, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log("CLOCK IN YOU'RE LATE!");
        console.log("\n //==================================================================\\ \n");
        questions();
    });
});

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: "tasks",
            message: "Welcome to ThunderDome... People die here!",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            // validate: function (value) {
            //     if (isNaN(value) === false) {
            //         return true;
            //     }
            //     return false;
            // }
        }
    ]).then(function (answer) {

        var managerTask = answer.tasks;
        switch (managerTask) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
        };
    });
};

function viewProducts() {
    connection.query("SELECT id, product_name, sushi_type, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log("VIEW CURRENT INVENTORY!");
        console.log("\n //==================================================================\\ \n");
        console.log("FOR REVIEW:");
        console.log(result);
        console.log("\n //=================================================================//");
        process.exit()
    });
};

function lowInventory() {
    connection.query("SELECT id, product_name, sushi_type, price, stock_quantity FROM products", function (err, response) {
        if (err) throw err;
        let lowExists = 0;
        for (i = 0; response[0].stock_quantity <= 100; i++) {
            lowExists++;
            if (lowExists > 0) {
                console.log("LOW INVENTORY!");
                console.log("\n //==================================================================\\ \n");
                console.log("FOR YOUR REVIEW:");
                console.log(response[i]);
                console.log("\n //=================================================================//");
                process.exit();
            } else {
                console.log("We have the fish!");
                process.exit();
            };
        };
        
    });
};
function addInventory() {
    connection.query("SELECT id, product_name, sushi_type, price, stock_quantity FROM products", function (err, result, fields) {
        if (err) throw err;
        
        function makeChoices() {
            let choicesArr = [];
            for (let i = 0; i < result.length; i++) {
                choicesArr.push(result[i].product_name);
            }
            return choicesArr;
        };
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'addChoice',
                message: "Which Product would you like to add inventory to? (Select product Name)",
                choices: makeChoices
            },
            {
                type: 'list',
                name: 'numbers',
                message: "How many would you like to add?",
                choices: ["25", "50", "75", "100", "100000"],
                // validate: function (value) {
                //     if (isNaN(value) === false) {
                //         return true;
                //     }
                //     return false;
                // }
            }
        ]).then(function (choice) {
            let productChoice = choice.addChoice;
            let productNumber = parseInt(choice.numbers);
            let newInventory = productNumber + result[0].stock_quantity;
            // updates database based on product_name and quantity choosen
            let sql = "UPDATE products SET stock_quantity = '" + newInventory + "' WHERE product_name = '" + productChoice + "'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                process.exit()
            });
        });
    });
};

function newProduct() {
    inquirer.prompt([
        {
            name: "name",
            message: "What new item would you like to add to Inventory? (product_name)",
        },
        {
            name: "dept",
            message: "What sushi type does this item belong to? (sushi_type)"
        },
        {
            name: "price",
            message: "How much does this product cost?"
        },
        {
            name: "quantity",
            message: "How many of this item are you putting into inventory, my guy?"
        }
    ]).then(function (newItems) {
        let newName = newItems.name;
        let newDept = newItems.dept;
        let newPrice = newItems.price;
        let newQuantity = parseInt(newItems.quantity);
        let sqlUpdate = "INSERT INTO products (product_name, sushi_type, price, stock_quantity) VALUES(' " + newName + "  ', ' " + newItems.dept + " ' ," + newPrice + ", " + newQuantity + ")";
        console.log("squlUpdate let" + sqlUpdate);
        connection.query(sqlUpdate, function (err, result) {
            if (err) throw err;
            console.log(newName + " added to record");
            process.exit()
        });
    });
};