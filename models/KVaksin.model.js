export default (sequelize, Sequelize) => {
    const LevelInstansi = sequelize.define("k_vaksin",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        uuid_user: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        imunisasi_tt: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return LevelInstansi;
}
