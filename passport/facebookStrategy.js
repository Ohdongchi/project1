const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.facebook_ID,
    clientSecret:process.env.facebook_secret,
    callbackURL: '/auth/facebook/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('profile' + profile);
    try {
      const exUser = await User.findOne({ where: { snsid: profile.id, provider: 'facebook' } } );
      if (exUser) {
        done(null, exUser); //회원정보가 있다면 이미가입된 이메일 출력
      } else { // 없다면 새로 생성
        const newUser = await User.create({
          nick: profile.displayName,
          snsid: profile.id,
          provider: 'facebook',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};