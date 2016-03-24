
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var sha256 = require('sha256');
var multer = require('multer');
var nodemailer = require('nodemailer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));

//// development only
//if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
//}
var auth = express.basicAuth(function (user, pass) {
    return (sha256(user) == "b1c3e21e21393b05010869358c887559e3fe2b21596c2dc7d510e195720e8870" && 
        sha256(pass) == "2428a825137feaaa2c45ad50f3d1fd4d7bb776eb63f989d712c7d510025abd88");
});

app.get('/', auth, routes.upload);

//var storage = multer.diskStorage({
//    destination: function (req, file, cb){
//        cb(null, '/');
//    },
//    filename: function (req, file, cb){
//        cb(null, file.originalname + '-' + Date.now());
//    }
//});

var upload = multer({ dest: 'public/uploads/' });

app.post('/upload', auth, upload.single('uploadedFile'), function (req, res) {
    console.log("SAVING - FILE");
    console.log(req.file);
    
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://aosct1%40gmail.com:AOSCTAOSCT@smtp.gmail.com');
        
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Or Lato 👥" <aosct1@gmail..com>', // sender address
        to: '<'+req.param("email")+'>', // list of receivers
        subject: 'Hello, File 4 U ✔', // Subject line
        text: 'Hey There 🐴', // plaintext body
        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path
            }
        ]
    };
        
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
