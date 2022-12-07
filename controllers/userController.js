//const connection = require('../db');
const path = require("path");


const mysql = require('mysql');

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "msql"

})

connection.connect();


const index = (req, res, next) => {

    connection.query("select * from crud", (err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).render("index", {
                status: "success",
                data: ""
            })
        } else {
            return res.status(200).render('index', {
                status: "failed",
                data: data
            });
        }
    });

}

const create = (req, res, next) => {

    return res.render('create', {
        statuse: false
    });

}

const edit = async (req, res, next) => {
    console.log(req.params);

    // try{
    //     const result = await connection.query(`select * from crud where id='${req.params.id}'`);
    //     console.log(result);
    //     return res.render('edit',{data:result});
    // }catch(err){

    //     console.log(err);
    // }

    connection.query(`select * from crud where id='${req.params.id}'`, (err, data) => {
        return res.render('edit', {
            data: data
        });
    });

}

const insert = (req, res, next) => {

    if (!req.files || req.files.img.size > 1000000) {
        return res.status(400).send("file not uploaded");
    } {

        try {

            //get extension
            const extension = path.parse(req.files.img.name).ext;

            //create name
            const savename = "img" + Math.floor(Math.random() * 10000000) + extension;

            //path
            const filedestination = "public/";

            //final
            const movename = filedestination + savename;

            req.files.img.mv(movename, (err) => {
                console.log(err);
            });

            const query = `insert into crud(name,email,mobile,description,image) values("${req.body.name}","${req.body.email}","${req.body.mobile}","${req.body.description}","${savename}") `;
            connection.query(query, function (err, data) {
                if (err) {
                    console.log(err)
                }
                console.log("successfully insered")
                return res.redirect('/create')
            });


        } catch (err) {
            console.log(err)
        }


    }
}

const destroy = async (req, res, next) => {

    try {
        const result = await connection.query(`delete from crud where id="${req.params.id}"`);
        if (result) {
            console.log("deleted successfull");
            return res.redirect('/')
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }

}

const update = (req, res, next) => {


    if (!req.files || req.files.img.size > 1000000) {
        return res.status(400).send("file not uploaded");
    } else {

        const extension = path.parse(req.files.img.name).ext;

        //create name
        const savename = "img" + Math.floor(Math.random() * 10000000) + extension;

        //path
        const filedestination = "public/";

        //final
        const movename = filedestination + savename;

        req.files.img.mv(movename, (err) => {
            console.log(err);
        });

        const request = req.body;

        connection.query(`update crud set name='${request.name}',email='${request.email}',mobile='${request.mobile}',description='${request.description}',image='${request.img}' where id='${request.uid}'`, (err, data) => {
            return res.redirect('/');
        });


    }

}

module.exports = {
    index,
    insert,
    create,
    edit,
    update,
    destroy
};