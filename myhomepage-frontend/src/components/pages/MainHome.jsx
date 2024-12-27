//첫번째 다이어리 형식의 컴포넌트
import '../../style/MainHome.css'

function MainHome() {
    return (
       <main>
               <div className="first_box">
            <div className='second_box'></div>
            <div className='TEXTBOX'>
                <p>nickname:</p>
                <p>email:</p>
            <p>comment:</p>
            </div>
        </div>
      
         <div className='main_box'>
              <div className='main_top'>
                <div className='today'>
                    <p>Today is....</p>
            </div>
                <div className='diary'>
                    <p>Diary</p>
                    <br />
                </div>
            </div>
                <p style={{marginLeft:'50px'}}>thumnail...</p>
             <div className='thumnail'></div>
            </div>       
        </main>


    );
}

export default MainHome;