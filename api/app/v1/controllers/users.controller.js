const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../models/session.model');
const register = require('../models/register.model')
var fs = require('fs')
var conversion = require("phantom-html-to-pdf")();
let data = fs.readFileSync("./receipt.html")
var handlebars = require('handlebars');
exports.registerUser = function (req, res) {
    register.retrive({ _id: req.body._id }, (err, data) => {
        console.log(data)
        if (data.length == 0) {
            register.addUser(req.body, (err, data) => {
                res.status(200).send({ msg: "User added succesfully" })
            })
        } else {
            res.status(200).send({ msg: "This user already exists" })

        }

    })

};

exports.getAllUsers = function (req, res) {
    register.retrive({}, (err, data) => {
        res.send(data)
    })
};


exports.getPdf((req, res) => {
    var readHTMLFile1 = function (path, callback) {
        console.log("INSIDE READFILE FUNC")
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {

                console.log("error", err)
                callback(err);
                throw err;
            }
            else {
                console.log("readFile done")
                callback(null, html);
            }
        });
    };
    readHTMLFile1(path.resolve('receipt.html'), function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            ID: "1",
            Date: "12/5/2023",
            name: "yagnesh"
        };
        var htmlToSend = template(replacements);
        conversion({ html: htmlToSend }, function (err, pdf) {
            var output = fs.createWriteStream('output.pdf')
            console.log(pdf.logs);
            console.log(pdf.numberOfPages);
            pdf.stream.pipe(output);
        });
    })
    res.download('./output.pdf')

})
exports.getUsersBySearch = function (req, res) {
    console.log(new Date(req.params.from + "T00:00:00.000Z"), new Date(req.params.to + "T23:59:00.000Z"))
    register.filterUsers({ createdAt: { $gte: new Date(req.params.from + "T00:00:00.000Z"), $lte: new Date(req.params.to + "T23:59:00.000Z") } }, (err, data) => {
        console.log(err, data)
        res.send(data)
    })
};