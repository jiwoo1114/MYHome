//마이홈(댓글작성,프로필 수정하는 거)

import '../../style/Myhome.css'
import React, { useState } from 'react';
import { updateProfile, createComment } from '../../api/myhome_api'

const Myhome = () => {

     const [profileImage, setProfileImage] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleProfileUpload = async () => {
        const formData = new FormData();
        if (profileImage) formData.append('profileImage', profileImage);
        if (thumbnailImage) formData.append('thumbnailImage', thumbnailImage);
        formData.append('nick', nickname);
        formData.append('email', email);
        formData.append('comment', comment);

        try {
            const response = await updateProfile(formData);
            alert('프로필이 성공적으로 등록되었습니다.' );
        } catch (error) {
            console.error('프로필 등록 실패:', error);
            alert('프로필 등록에 실패했습니다.');
        }
    };

    const handleCommentSubmit = async () => {
        const commentData = {
            content: comment,
        };

        try {
            const response = await createComment(commentData);
            alert('댓글이 성공적으로 작성되었습니다.');
        } catch (error) {
            console.error('댓글 작성 실패:', error);
            alert('댓글 작성에 실패했습니다.');
        }
    };

    return (
       <>
           <h1>마이 홈</h1>
            <div className="container">
                <div className="header">My Home</div>

                <div className="profile-section">
                    <div className="profile-box">
                        <p>프로필 이미지 부분</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                    </div>
                    <div className="profile-box">
                        <p>nick:</p>
                        <input
                            type="text"
                            placeholder="닉네임 입력"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <p>email:</p>
                        <input
                            type="email"
                            placeholder="이메일 입력"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p>comment:</p>
                        <input
                            type="text"
                            placeholder="코멘트 입력"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div className="profile-box">
                        <p>썸네일 이미지 부분</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setThumbnailImage(e.target.files[0])}
                        />
                    </div>
                </div>

                <button className="create" onClick={handleProfileUpload}>
                    프로필 등록
                </button>

                <button className="create" onClick={handleCommentSubmit}>
                    댓글 작성
                </button>

                <div className="comment-section">
                    <table className="comment-table">
                        <thead>
                            <tr>
                                <th>작성자</th>
                                <th>댓글</th>
                                <th>작성일</th>
                                <th>수정</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>사용자1</td>
                                <td>좋은 글이네요!</td>
                                <td>2024-01-01</td>
                                <td>
                                    <button>수정</button>
                                </td>
                                <td>
                                    <button>삭제</button>
                                </td>
                            </tr>
                            <tr>
                                <td>사용자2</td>
                                <td>감사합니다!</td>
                                <td>2024-01-02</td>
                                <td>
                                    <button>수정</button>
                                </td>
                                <td>
                                    <button>삭제</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>     
    )
}

export default Myhome