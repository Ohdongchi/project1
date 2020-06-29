const express = require('express');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./login');
const fs = require('fs');
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        res.render('main', {
            title: 'Web programing 교양',
            user: req.user,

        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/DI', async (req, res, next) => {
    try {
        res.render('profile', {
            title: 'Developer Information',
            user: req.user,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/stack', async (req, res, next) => {
    try {
        res.render('stack', {
            title: 'Developer Stack',
            user: req.user,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
})
module.exports = router;