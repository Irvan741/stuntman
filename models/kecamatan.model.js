export default (sequelize, Sequelize) => {
    const Kecamatan = sequelize.define("kecamatan", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        regency_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Kecamatan;
};
