const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {User} = require('../models');

module.exports = (passport) => {
    // local
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
    }, async(email,password,done) => {
        try{
            const exUser = await User.findOne({where:{email}});
            if(exUser){
                const result = await bcrypt.compare(password,exUser.password);
                if(result) { // result == 비밀번호
                    done(null,exUser); // 회원가입이 되있다면 로그인 완료
                } else{
                    // 회원가입은 되있지만 비밀번호가 맞지 않는 경우
                    done(null,false,{message:'비밀번호가 일치하지 않습니다.'})
                }
            } else{ //가입된 회원이 존재하지 않는 경우
                done(null,false,{message:'가입되지 않은 회원입니다'})
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};



// // req.body 에서 요청이 오기 때문에 req.body.id 를 사용할 필요없이 id라고만 써도 req.body.id가 된다.
// // req가 매개변수로 들어가기때문에 findOne 에서 email을 찾을때 
// // email:req.body.email을 하지 않아도 된다.
// // 이는 email 앞에 req.body라는 매개변수가 숨겨져 있기 때문이다.
// // async (req(생략),email,password,done)