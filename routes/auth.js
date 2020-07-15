const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./login');
const flash = require('connect-flash');

require('dotenv').config();

const router = express.Router();

/*Register get*/
router.get('/register', isNotLoggedIn, async(req, res, next) => {
    try {
        res.render('register', {
            title: 'Web-Minor-Register',
            user: req.user,
        })
    } catch {
        console.error(error);
        next(error);
    }
});
/*Register post*/
router.post('/register', isNotLoggedIn, async(req, res, next) => {
    try {
        const exUser = await User.findOne({ where: { email: req.body.email } });
        if (exUser) {
            req.flash('registerError', '이미 가입된 이메일 입니다.');
            return res.redirect('/register');
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            await User.create({
                email: req.body.email,
                nick: req.body.name,
                password: hash,
            })
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
/*login get*/
router.get('/login', isNotLoggedIn, async(req, res, next) => {
    try {
        res.render('signIn', {
            title: 'Web-Minor-signIn',
            user: req.user,
            loginError: req.flash('loginError'),
        })
    } catch {
        console.error(error);
        next(error);
    }
});

/*login post*/
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            console.error(error);
            return next(error);
        }

        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/auth/login');
        }

        req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError)
            }
            console.log(user.nick + ' 님이 로그인 하셨습니다.'); /* 접속자 이름 */
            return res.redirect('/auth/login');
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, async(req, res, next) => {
    try {
        req.logout();
        res.clearCookie(process.env.COOKIE_SECRET);
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// router.get('/facebook', passport.authenticate('facebook'));

// router.get('/facebook/callback', passport.authenticate('facebook', {
//     failureRedirect: '/auth/signIn',
//     successRedirect: '/'
// }), (req, res) => {
//     console.log('연결성공');
//     res.redirect('/');
// });
module.exports = router;