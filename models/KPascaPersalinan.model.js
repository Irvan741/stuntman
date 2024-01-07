export default (sequelize, Sequelize) => {
    const KPascaPersalinan = sequelize.define("k_pascapersalinan", {
        uuid: {
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        tanggal_melahirkan: {
            type: Sequelize.DATE,
        },
        anak_ke: {
            type: Sequelize.INTEGER,
        },
        kunjungan_ke: {
            type: Sequelize.INTEGER,
        },
        tempat_persalinan: {
            type: Sequelize.STRING,
        },
        nama_tempat_persalinan: {
            type: Sequelize.STRING,
        },
        usia_hamil_saat_ini: {
            type: Sequelize.INTEGER,
        },
        status_usia_hamil: {
            type: Sequelize.STRING,
        },
        tfu: {
            type: Sequelize.FLOAT,
        },
        status_tfu: {
            type: Sequelize.STRING,
        },
        berisiko:{
            type: Sequelize.BOOLEAN,
            allowNull: true
        },

        status_kelahiran_bayi: {
            type: Sequelize.STRING
        },
        status_ibu: {
            type: Sequelize.STRING
        },
        uuid_pemeriksaan:{
            type: Sequelize.CHAR(36)
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    return KPascaPersalinan;
}
