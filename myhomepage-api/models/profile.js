const Sequelize = require('sequelize');

module.exports = class Profile extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                // 기본 키
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                profileimg: {
                    type: Sequelize.STRING(200),
                    allowNull: true,  // 프로필 사진
                },
                thumbnail: {
                    type: Sequelize.STRING(200),
                    allowNull: true,  // 썸네일 사진
                },
                nickname: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    validate: {
                        isEmail: true, // 유효한 이메일 형식인지 검증
                    },
                },
                comment: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Profile',
                tableName: 'profiles',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Profile.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        });
    }
};
