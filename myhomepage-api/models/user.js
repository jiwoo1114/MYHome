
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(50),
                    unique: true,  // 이메일 중복 방지
                    allowNull: false,
                },
                nickname: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    
    static associate(db) {
        db.User.hasOne(db.Profile, {
            foreignKey: 'userId',
            sourceKey: 'email',
        });
        db.User.hasMany(db.Comment, {
            foreignKey: 'userId',
            sourceKey: 'email',
        });
        db.User.hasMany(db.Diary, {
            foreignKey: 'userId',
            sourceKey: 'email',
        });
    }
};
