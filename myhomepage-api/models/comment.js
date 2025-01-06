const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // 기본 키
            id: {
               type: Sequelize.INTEGER,
               primaryKey: true, // 기본 키 설정
               autoIncrement: true, // 자동 증가
               allowNull: false,
            },
            content: {
               type: Sequelize.TEXT,
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, // createdAt, updatedAt 자동 생성
            underscored: false, // CamelCase 필드 사용 여부
            modelName: 'Comment', // 모델 이름
            tableName: 'comments', // 테이블 이름
            paranoid: true, // deletedAt 필드로 논리 삭제
            charset: 'utf8mb4', // 유니코드 지원
            collate: 'utf8mb4_general_ci', // 유니코드 정렬
         }
      )
   }

   static associate(db) {
      // Comment는 User에 속합니다
      db.Comment.belongsTo(db.User, {
         foreignKey: 'userId', // Comment 테이블의 외래 키
         targetKey: 'id', // User의 기본 키
      })
   }
}
