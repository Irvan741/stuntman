export default (sequelize, Sequelize) => {
    const LevelInstansi = sequelize.define("level_instansi",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return LevelInstansi;
}
