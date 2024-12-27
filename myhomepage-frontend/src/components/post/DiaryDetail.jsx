//작성한 다이어리가 나타는 페이지

 import { Form } from 'react-router-dom'
import '../../style/diarydetail.css'


const DiaryDetail = () => {

    return (
        <><h1>다이어리</h1>
            <form className='container' style={{display:'flex'}}>
            <div  className="first">
                <div className="img"></div>
                <p></p>
            </div>
            <div className="second">
                <div className="img" ></div>
                <p></p>
            </div>
            </form>
        <button className='confirm' ></button>
        </>


        
        
    )
}
 
export default DiaryDetail