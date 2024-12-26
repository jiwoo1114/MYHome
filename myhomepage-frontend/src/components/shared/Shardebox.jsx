//반복되는 민트색 배경 점선, 회색 그림자박스

import React from 'react';
import '../../style/shardbox.css';

const SharedBox = ( {children} ) => {
  return (
    <div className="shared-box">
      <div className="dashed-border">
        <div className="inner-box">
           {children} {/* 이곳에 자식 컴포넌트나 내용이 들어감 */}
        </div>
      </div>
    </div>
  );
};

export default SharedBox;
