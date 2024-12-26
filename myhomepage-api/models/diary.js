const Sequelize = require('sequelize');

module.exports = class Diary extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                // 기본 키
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,       // 기본 키 설정
                    autoIncrement: true,    // 자동 증가
                    allowNull: false,
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(200),
                    allowNull:true
                 }
            },
            {
                sequelize,
                timestamps: true,        // createdAt, updatedAt 자동 생성
                underscored: false,      // CamelCase 필드 사용 여부
                modelName: 'Diary',    // 모델 이름
                tableName: 'diarys',   // 테이블 이름
                paranoid: true,          // deletedAt 필드로 논리 삭제
                charset: 'utf8mb4',      // 유니코드 지원
                collate: 'utf8mb4_general_ci', // 유니코드 정렬
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, {
            foreignKey: 'userId',       // 외래 키 이름
            targetKey: 'email',            // 참조 대상 키
        });

        
        db.Diary.hasMany(db.Comment, {
            foreignKey: 'diaryId', 
            sourceKey: 'id',      
        });
    }
};