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
        console.log("Yokoso, to Sushi World");
        console.log("\n //==================================================================\\ \n");
        console.log("For Your Consideration:");
        console.log(result);
        console.log("\n \\=================================================================//");
        questions();
    });
});

function questions() {
    inquirer.prompt([
        {
            name: "id",
            message: "What would you like to eat? Please select (by ID) would you like!",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },

        {
            name: "quantity",
            message: "How many can you eat?"
            //          "UPDATE products SET ? WHERE ?"
        }
    ]).then(function (answers) {

        var quantityInput = answers.quantity;
        var idInput = answers.id;
        purchase(idInput, quantityInput);
    });
}

function purchase(id, quantityInput) {

    connection.query('SELECT * FROM products WHERE id = ' + id, function (error, response) {
        if (error) { console.log(error) };

        if (quantityInput <= response[0].stock_quantity) {

            let totalCost = response[0].price * quantityInput;

            console.log("\nOne moment please");
            console.log("If you want " + quantityInput + " " + response[0].product_name + " and your total is $" + totalCost + ". Have a nice day! \n");

            var newInventory = response[0].stock_quantity - parseInt(quantityInput);
            var sql = "UPDATE products SET stock_quantity = '" + newInventory + "' WHERE id = '" + id + "'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                process.exit()
            });
        } else {
            console.log("Sorry we're sold out " + response[0].product_name + " , friend\n ");
            process.exit()
        };
    });
};