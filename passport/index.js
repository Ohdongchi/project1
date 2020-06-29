const local = require('./localStrategy');
const facebook = require('./facebookStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    // passport는 세션에서 값을 가져오기 때문에
    // 요청 세션에서 id값을 가져올수있다.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({
                where: { id },
            })
            .then(user => done(null, user), )
            .catch(err => done(err));
    });
    local(passport); // 로컬 아이디 
    facebook(passport);
};