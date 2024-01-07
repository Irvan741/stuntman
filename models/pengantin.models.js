export default (sequelize, Sequelize) => {
    const Pengantin = sequelize.define("pengantin",{
        uuid:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        uuid_user: {
            type: Sequelize.CHAR(36),
        },
        nik_pria: {
            type: Sequelize.CHAR(16),
        },
        nik_wanita: {
            type: Sequelize.CHAR(16),
        },
        tgl_perkiraan_pernikahan: {
            type: Sequelize.DATE,
        },
        tgl_pernikahan: {
            type: Sequelize.DATE,
        },
        di_kua: {
            type: Sequelize.BOOLEAN,
        },
        kecamatan_pernikahan: {
            type: Sequelize.CHAR(7),
        },
        kelurahan_pernikahan: {
            type: Sequelize.CHAR(10),
        },
        alamat_pernikahan: {
            type: Sequelize.TEXT,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return Pengantin;
}