//작성한 다이어리가 나타는 페이지


import '../../style/diarydetail.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiariesThunk, deleteDiaryThunk } from '../../featurs/diarySlice';



const DiaryDetail = () => {
    const dispatch = useDispatch();
    const { diaries = [], pagination } = useSelector((state) => state.diary);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchDiariesThunk(currentPage));
    }, [dispatch, currentPage]);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            dispatch(deleteDiaryThunk(id))
                .unwrap()
                .then(() => alert('게시글이 삭제되었습니다.'))
                .catch((error) => {
                    console.error('삭제 오류:', error);
                    alert('삭제에 실패했습니다.');
                });
        }
    };

    return (
        <>
            <h1>다이어리</h1>
            <form className='container' style={{display:'flex'}}>
            <div  className="first">
                <div className="img"></div>
                    <p></p>
                    <div className='textbox'>
                        <Link to="/diary/update/:id" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p>수정</p>
                        </Link>
                            <p onClick={handleDelete}>삭제</p>
                    </div>
                    
            </div>
            <div className="second">
                <div className="img" ></div>
                    <p></p>
                    <div className='textbox'>
                         <Link to="/diary/update/:id" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p>수정</p>
                        </Link>
                            <p onClick={handleDelete}>삭제</p> 
                    </div>
                    
            </div>
            </form>
             <button className="confirm">
         <Link to="/diary/create" style={{ textDecoration: 'none', color: 'inherit' }}>
        등록
        </Link>
            </button>
        </>
    );
};

export default DiaryDetail;
