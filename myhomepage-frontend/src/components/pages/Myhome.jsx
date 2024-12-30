//마이홈(댓글작성,프로필 수정하는 거)

import '../../style/Myhome.css'

const Myhome = () => {
    return (
       <>
            <h1>마이 홈</h1>
             <div class="container">
        <div class="header">My Home</div>
        
        <div class="profile-section">
            <div class="profile-box">
                <p>프로필 이미지 부분</p>
                <input type="file" accept="image/*" />
            </div>
            <div class="profile-box">
                <p>nick:</p>
                <input type="text" placeholder="닉네임 입력" />
                <p>email:</p>
                <input type="email" placeholder="이메일 입력" />
                <p>comment:</p>
                <input type="text" placeholder="코멘트 입력" />
            </div>
            <div class="profile-box">
                <p>썸네일 이미지 부분</p>
                <input type="file" accept="image/*" />
            </div>
        </div>

        <div class="comment-section">
            <table class="comment-table">
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
                        <td><button>수정</button></td>
                        <td><button>삭제</button></td>
                    </tr>
                    <tr>
                        <td>사용자2</td>
                        <td>감사합니다!</td>
                        <td>2024-01-02</td>
                        <td><button>수정</button></td>
                        <td><button>삭제</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        </>     
    )
}

export default Myhome