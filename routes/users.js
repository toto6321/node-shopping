var express = require('express');
var session = require('express-session');
var router = express.Router();

var conn = require('./connection');
var connection = conn.connection();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// login page
router.get('/', function (req, res, next) {
    res.render('login', {});
});


router.get('/login', function (req, res, next) {
    res.render('login', {});
});

// sign upo page
router.get('/signup', function (req, res, next) {
    res.render('signup', {});
});


router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    connection.query(`SELECT password FROM node_shopping.account where email = '${email}'`, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({
                error: {
                    code: '11000',
                    message: 'internal error!'
                }
            });
            throw err;
        } else {
            console.log(rows);
            if (rows.length === 0) {
                res.json({
                    error: {
                        code: '10001',
                        message: 'The user does not exists!'
                    }
                })
            } else if (password === rows[0].password) {
                req.session.email = email;
                res.render('index', {email: email});
            } else {
                res.json({
                    error: {
                        code: '10010',
                        message: 'The password does not match!'
                    }
                })
            }
        }

    });
});

router.post('/signup', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    if (password !== password2) {
        res.json({
            error: {
                code: '11000',
                message: 'Passwords do not match'
            }
        });

    }
    const select = `SELECT password FROM \`node_shopping\`.\`account\` where email = '${email}'`;
    console.log(select);
    connection.query(select, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({
                error: {
                    code: '11000',
                    message: 'internal error!'
                }
            });
            throw err;
        } else {
            console.log(rows);
            if (rows.length > 0) {
                res.json({
                    error: {
                        code: '10100',
                        message: 'The user has already existed!'
                    }
                })
            } else {
                const insert = `INSERT INTO \`node_shopping\`.\`account\`(\`email\`, \`password\`) VALUES ('${email}', '${password}')`;
                console.log(insert);
                connection.query(insert, function (err, rows) {
                    if (err) {
                        res.status(500);
                        res.json({
                            error: {
                                code: '11000',
                                message: 'internal error!'
                            }
                        });
                    } else {
                        res.render('index', {email: undefined});
                    }
                });

            }
        }

    });
});

router.get('logout', function (req, res, next) {
    req.session.email = '';
    res.redirect('/index');
});


module.exports = router;
