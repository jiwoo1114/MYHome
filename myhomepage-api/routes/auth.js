// 로그인, 로그아웃, 회원가입
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middleware')
const User = require('../models/user')

const router = express.Router()

// 회원가입 localhost:8000/auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   const { email, nick, password } = req.body
   try {
      // 이메일로 기존 사용자 검색
      const exUser = await User.findOne({ where: { email } })

      if (exUser) {
         // 이미 사용자가 존재할 경우 409 상태코드와 메시지를 JSON 객체로 응답
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 이메일입니다.',
         })
      }

      // 이메일 중복 확인을 통과 시 새로운 사용자 계정 생성

      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12) // 12: salt

      // 새로운 사용자 생성
      const newUser = await User.create({
         email,    // email로 사용자 생성
         nick,
         password: hash,
      })

      // 성공 응답 반환
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
         error,
      })
   }
})

// 로그인 localhost:8000/auth/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         // 로그인 인증 중 에러 발생 시
         return res.status(500).json({ success: false, message: '인증 중 오류 발생', error: authError })
      }

      if (!user) {
         // 비밀번호 불일치 또는 사용자가 없을 경우
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }

      // 인증이 정상적으로 되고 사용자를 로그인 상태로 바꿈
      req.login(user, (loginError) => {
         if (loginError) {
            return res.status(500).json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }

         // 로그인 성공 시 user 객체와 함께 response
         res.json({
            success: true,
            message: '로그인 성공',
            user: {
               email: user.email,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃 localhost:8000/auth/logout
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((err) => {
      if (err) {
         console.log(err)

         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }

      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

// 로그인 상태 확인 localhost:8000/auth/status
router.get('/status', async (req, res, next) => {
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: {
            email: req.user.email, // email 반환
            nick: req.user.nick,
         },
      })
   } else {
      res.json({
         isAuthenticated: false,
      })
   }
})

module.exports = router
