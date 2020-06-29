module.exports = (sequelize, DataTypes) => (
    sequelize.define('imageUrl', {
        imageUrl: {
            type: DataTypes.TEXT,
            allowNULL: true,
        },
    }, {
        timestamps: false,
    })
);