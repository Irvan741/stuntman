export default (sequelize, Sequelize) => {
    const JenisInstansi = sequelize.define("jenis_instansi",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return JenisInstansi;
}