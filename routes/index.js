/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

exports.upload = function (req, res) {
    res.render('upload', { title: 'Upload Page', year: new Date().getFullYear() });
};