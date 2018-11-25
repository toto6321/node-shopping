var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

var conn = require('./connection');
var connection = conn.connection();

var data;

connection.query('SELECT * FROM node_shopping.products', function (err, rows) {
    if (err) throw err;
    data = rows;
});

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

var cart_data, cart = {};

router.post('/', function (req, res) {
    cart = req.session.cart;
    if (!cart) {
        cart = req.session.cart = {}
    }

    var id = req.body.id;
    var count = parseInt(req.body.count, 10);

    cart[id] = (cart[id] || 0) + count;

    var ids = Object.keys(cart);

    if (ids.length > 0) {
        connection.query('SELECT * FROM node_shopping.products WHERE id IN (' + ids + ')', function (err, rows) {
            if (err) throw err;
            cart_data = rows;
            res.render('index', {title: 'Node Shopping', data: data, currency: 'Rs. ', cart_data: rows, cart: cart});
        });
    } else {
        res.render('index', {title: 'Node Shopping', data: data, currency: 'Rs. ', cart_data: cart_data});
    }
});

router.get('/', function (req, res) {
    if(!req.session.email){
        res.redirect('/users/login/');
    }else{
        res.render('index', {title: 'Node Shopping', data: data, currency: 'Rs. ', cart_data: cart_data, cart: cart});
    }
});

router.get('/pay', function (req, res) {
    cart_data = req.session.cart = {};
    res.render('message', {title: 'Payment Success', message: "Payment was successful and your order being processed!"});
});

router.get('/clear', function (req, res) {
    cart_data = req.session.cart = {};
    res.render('message', {title: 'Shopping Cart Cleared!', message: "Shopping Cart has been flushed!"});
});


module.exports = router;
