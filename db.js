const mysql = require('mysql2/promise');

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "msql"

})
// .then((res) => {
//     console.log("connection successful")
// }).catch((err) => {
//     console.log(err)
// });

// const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "mysql",
//     port: 3306,
//     password: ""
// });

module.exports=connection;