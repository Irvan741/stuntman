export default (sequelize, Sequelize) => {
    const KBumil = sequelize.define("k_bumil",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        pemeriksaan_ke:{
            type: Sequelize.INTEGER,
        },
        jumlah_anak:{
            type: Sequelize.INTEGER,
        },
        status_jumlah_anak:{
            type: Sequelize.STRING,
        },
        tgl_lahir_anak_terakhir: {
            type: Sequelize.DATE,
        },
        status_terlalu_dekat:{
            type: Sequelize.STRING,
        },
        usia_hamil_saat_ini: {
            type: Sequelize.INTEGER,
        },
        status_usia_hamil: {
            type: Sequelize.STRING,
        },
        tfu:{
            type: Sequelize.FLOAT,
        },
        status_tfu:{
            type: Sequelize.STRING,
        },
        berisiko:{
            type: Sequelize.BOOLEAN,
        },
        uuid_pemeriksaan:{
            type: Sequelize.CHAR(36),
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return KBumil;
}