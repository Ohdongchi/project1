module.exports = (sequelize, DataTypes) => (
    sequelize.define('Board', {
        boardName: {
            type: DataTypes.STRING(20),
            allowNULL: false,
        },
        boardText: {
            type: DataTypes.TEXT,
            allowNULL: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
);