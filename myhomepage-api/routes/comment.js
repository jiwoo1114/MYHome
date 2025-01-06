const express = require('express')
const { Comment, User, Diary } = require('../models')
const { isLoggedIn } = require('./middleware') // 로그인 체크 미들웨어
const router = express.Router()

// 댓글 등록
router.post('/create', isLoggedIn, async (req, res) => {
   const { content } = req.body
   const userId = req.user.id // 로그인한 사용자의 ID

   if (!content) {
      return res.status(400).json({ message: '댓글 내용은 필수입니다!' })
   }

   try {
      const comment = await Comment.create({
         content,
         userId,
      })
      return res.status(201).json({ message: '댓글이 등록되었습니다.', comment })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '서버 오류. 댓글 등록에 실패했습니다.' })
   }
})

// 댓글 수정
router.put('/update/:id', isLoggedIn, async (req, res) => {
   const { content } = req.body
   const commentId = req.params.id
   const userId = req.user.id // 로그인한 사용자의 ID

   if (!content) {
      return res.status(400).json({ message: '댓글 내용은 필수입니다.' })
   }

   try {
      const comment = await Comment.findByPk(commentId)

      if (!comment) {
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
      }

      if (comment.userId !== userId) {
         return res.status(403).json({ message: '다른 사용자의 댓글은 수정할 수 없습니다.' })
      }

      comment.content = content
      await comment.save()

      return res.status(200).json({ message: '댓글이 수정되었습니다.', comment })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '서버 오류. 댓글 수정에 실패했습니다.' })
   }
})

// 댓글 삭제
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
   const commentId = req.params.id
   const userId = req.user.id // 로그인한 사용자의 ID

   try {
      const comment = await Comment.findByPk(commentId)

      if (!comment) {
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
      }

      if (comment.userId !== userId) {
         return res.status(403).json({ message: '다른 사용자의 댓글은 삭제할 수 없습니다.' })
      }

      await comment.destroy() // 삭제 (논리적 삭제는 `paranoid` 속성에 의해 `deletedAt` 컬럼이 업데이트됨)
      return res.status(200).json({ message: '댓글이 삭제되었습니다.' })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '서버 오류. 댓글 삭제에 실패했습니다.' })
   }
})

// 댓글 전체 조회 (페이징, 최신순 정렬)
router.get('/', isLoggedIn, async (req, res) => {
   const { page = 1 } = req.query // 기본 페이지는 1
   const limit = 2 // 한 페이지에 표시할 댓글 수
   const offset = (page - 1) * limit // 페이징 offset 계산

   try {
      const { count, rows: comments } = await Comment.findAndCountAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']], // 최신순 정렬
         include: [
            {
               model: User,
               attributes: ['nick'], // 작성자의 닉네임만 포함
            },
         ],
      })
      return res.status(200).json({
         message: '댓글 목록을 불러왔습니다.',
         totalComments: count, // 전체 댓글 수
         totalPages: Math.ceil(count / limit), // 전체 페이지 수
         currentPage: parseInt(page, 10),
         comments,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '서버 오류. 댓글 목록 조회에 실패했습니다.' })
   }
})

module.exports = router
