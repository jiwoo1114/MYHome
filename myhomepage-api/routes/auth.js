// 로그인, 로그아웃, 회원가입
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middleware')
const User = require('../models/user')

const router = express.Router()

// 회원가입 localhost:8000/auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   const { email, nick, password } = req.body;

   if (!email || !nick || !password) {
      return res.status(400).json({
         success: false,
         message: '이메일, 닉네임, 비밀번호는 필수 항목입니다.',
      });
   }

   try {
      const exUser = await User.findOne({ where: { email } });

      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 이메일입니다.',
         });
      }

      const hash = await bcrypt.hash(password, 12);

      const newUser = await User.create({
         email,
         nick,
         password: hash,
      });

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            email: newUser.email,
            nick: newUser.nick,
         },
      });
   } catch (error) {
      console.error('회원가입 에러:', error);
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
         error: error.message,
      });
   }
});

// 로그인 localhost:8000/auth/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({
         success: false,
         message: '이메일과 비밀번호는 필수 항목입니다.',
      });
   }

   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         return res.status(500).json({ success: false, message: '인증 중 오류 발생', error: authError });
      }

      if (!user) {
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         });
      }

      req.login(user, (loginError) => {
         if (loginError) {
            return res.status(500).json({ success: false, message: '로그인 중 오류 발생', error: loginError });
         }

         res.json({
            success: true,
            message: '로그인 성공',
            user: {
               email: user.email,
               nick: user.nick,
            },
         });
      });
   })(req, res, next);
});

// 로그아웃 localhost:8000/auth/logout
router.get('/logout', isLoggedIn, async (req, res, next) => {
     //사용자를 로그아웃 상태로 바꿈
   req.logout((err) => {
      if (err) {
         //로그아웃 상태로 바꾸는 중 에러가 났을때
         console.log(err)

         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }

      //로그아웃 성공시 세션에 저장되어 있던 사용자 id를 삭제해주고 아래와 같은 결과를 response
      //status code를 주지 않으면 기본값은 200(성공)
      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
});

// 로그인 상태 확인 localhost:8000/auth/status
router.get('/status', (req, res) => {
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: {
            email: req.user.email,
            nick: req.user.nick,
         },
      });
   } else {
      res.json({
         isAuthenticated: false,
      });
   }
});

module.exports = router;
