
export default (sequelize, Sequelize) => {
    const Baduta = sequelize.define("baduta", {
        uuid: {
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        nik: {
            type: Sequelize.STRING
        },
        nama: {
            type: Sequelize.STRING
        },
        tempat_lahir: {
            type: Sequelize.STRING
        },
        tanggal_lahir: {
            type: Sequelize.DATE
        },
        jenis_kelamin: {
            type: Sequelize.CHAR(1)
        },
        urutan_anak_ke: {
            type: Sequelize.INTEGER
        },
        status_urutan: {
            type: Sequelize.INTEGER
        },
        tempat_persalinan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nama_tempat_persalinan: {
            type: Sequelize.STRING
        },
        umur_kehamilan_saat_lahir: {
            type: Sequelize.INTEGER
        },
        panjang_badan_saat_lahir: {
            type: Sequelize.FLOAT
        },
        berat_badan_saat_lahir: {
            type: Sequelize.FLOAT
        },
        pemberian_asi_exclusive: {
            type: Sequelize.BOOLEAN
        },
        nik_orang_tua: {
            type: Sequelize.STRING
        },
        uuid_petugas: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    return Baduta;
};
