var mysql = require('mysql'); 

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hackpr"
});

exports.insertIntoDb = function (webhook_event) {

    con.connect(function (err) {
        if (err) throw err;
        console.log(webhook_event);
        var value = webhook_event["value"];
        var name = value["from"]["name"];
        var id = value["from"]["id"];
        var item = value["item"];
        var post_id = value["post_id"];
        var verb = value["verb"];
        var published = value["published"];
        var created_time = value["created_time"];
        var message = value["message"];


        var sql = `INSERT INTO feedtable (id, name, message, created_time, published, verb, post_id, item) VALUES ('${id}', '${name}', '${message}', '${created_time}', '${published}', '${verb}', '${post_id}','${item}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

}