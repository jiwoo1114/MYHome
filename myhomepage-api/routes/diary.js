 //다이어리수정등록삭제


const express = require('express');
const { Diary } = require('../models'); // Diary 모델 임포트
const { isLoggedIn } = require('./middleware'); // 로그인 여부 미들웨어
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// 업로드 폴더가 없으면 생성
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const uploadDir = 'uploads/diary_images';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = Date.now() + ext;
      cb(null, filename);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

// 1. 게시글 등록 (Create)
router.post('/create', isLoggedIn, upload.single('img'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const img = req.file ? req.file.filename : null; // 파일이 있을 경우 파일명 저장

    const newDiary = await Diary.create({
      title,
      content,
      img,
      userId: req.user.id, // 작성자 userId
    });

    res.status(201).json({ message: '게시글이 작성되었습니다.', data: newDiary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '게시글 작성에 실패했습니다.' });
  }
});

// 2. 게시글 수정 (Update)
router.put('/update/:id', isLoggedIn, upload.single('img'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const img = req.file ? req.file.filename : null; // 파일이 있을 경우 파일명 저장
    const { id } = req.params;

    const diary = await Diary.findByPk(id);

    if (!diary) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    if (diary.userId !== req.user.id) {
      return res.status(403).json({ error: '자신의 게시글만 수정할 수 있습니다.' });
    }

    // 수정할 내용이 있으면 업데이트
    const updatedDiary = await diary.update({
      title: title || diary.title,
      content: content || diary.content,
      img: img || diary.img, // 새로운 이미지가 있으면 업데이트
    });

    res.status(200).json({ message: '게시글이 수정되었습니다.', data: updatedDiary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '게시글 수정에 실패했습니다.' });
  }
});

// 3. 게시글 삭제 (Delete)
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;

    const diary = await Diary.findByPk(id);

    if (!diary) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    if (diary.userId !== req.user.id) {
      return res.status(403).json({ error: '자신의 게시글만 삭제할 수 있습니다.' });
    }

    await diary.destroy();

    res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '게시글 삭제에 실패했습니다.' });
  }
});

// 4. 전체 게시글 조회 (Read - Paginated)
// localhost:8000/diary/all
router.get('/all', isLoggedIn, async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1; // 페이지 번호 (기본값: 1)
    const limit = 2; // 한 페이지에 표시할 게시물 수
    const offset = (page - 1) * limit; // 페이지에 맞게 offset 계산

    // 게시글 조회 (최신 날짜 순으로 정렬)
    const diaries = await Diary.findAndCountAll({
      limit, // 가져올 게시물 수
      offset, // 시작 위치
      order: [['createdAt', 'DESC']], // 최신 날짜 순 정렬
      include: [
        {
          model: require('../models').User, // User 모델을 포함하여 닉네임 가져오기
          attributes: ['nick'], // 닉네임만 가져오기
        },
      ],
    });

     console.log('쿼리 결과:', diaries);

    res.status(200).json({
      success: true,
      message: '게시글을 성공적으로 불러왔습니다.',
      data: diaries.rows, // 게시글 배열
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(diaries.count / limit), // 전체 페이지 수 계산
        totalItems: diaries.count, // 전체 게시물 수
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '게시글을 불러오는 중 오류가 발생했습니다.' });
  }
});


module.exports = router;