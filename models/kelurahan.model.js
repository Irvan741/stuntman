export default (sequelize, Sequelize) => {
    const Kelurahan = sequelize.define("kelurahan", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        district_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Kelurahan;
};
