const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Profile } = require('../models');
const { isLoggedIn } = require('./middleware');
const router = express.Router();

// uploads 폴더가 없을 경우 생성
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// 프로필 및 썸네일 사진 업데이트
router.post('/update-profile', isLoggedIn, upload.fields([
    { name: 'profileImage', maxCount: 1 },  // 프로필 사진
    { name: 'thumbnailImage', maxCount: 1 }  // 썸네일 사진
]), async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: '프로필을 찾을 수 없습니다.' });
        }

        const updatedData = {};

        // 프로필 사진 수정
        if (req.files.profileImage) {
            // 기존 프로필 사진이 있으면 삭제
            if (profile.profileimg) {
                fs.unlinkSync(`uploads/${profile.profileimg}`);
            }
            updatedData.profileimg = req.files.profileImage[0].filename;  // 새 프로필 이미지
        }

        // 썸네일 사진 수정
        if (req.files.thumbnailImage) {
            // 기존 썸네일 사진이 있으면 삭제
            if (profile.thumbnail) {
                fs.unlinkSync(`uploads/${profile.thumbnail}`);
            }
            updatedData.thumbnail = req.files.thumbnailImage[0].filename;  // 새 썸네일 이미지
        }

        // 프로필 업데이트
        await profile.update(updatedData);

        res.status(200).json({ message: '프로필과 썸네일 사진이 업데이트되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '프로필을 업데이트하는 데 실패했습니다.' });
    }
});

// 프로필 및 썸네일 사진 삭제
router.delete('/delete-profile', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: '프로필을 찾을 수 없습니다.' });
        }

        // 기존 프로필 사진과 썸네일 사진 삭제
        if (profile.profileimg) {
            fs.unlinkSync(`uploads/${profile.profileimg}`);
        }
        if (profile.thumbnail) {
            fs.unlinkSync(`uploads/${profile.thumbnail}`);
        }

        // 프로필 삭제
        await profile.destroy();

        res.status(200).json({ message: '프로필과 관련된 이미지가 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '프로필을 삭제하는 데 실패했습니다.' });
    }
});

module.exports = router;
