export default (sequelize, Sequelize) => {
    const DataPemeriksaanBaduta = sequelize.define("data_pemeriksaan_baduta", {
        uuid: {
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        uuid_baduta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tgl_pengukuran: {
            type: Sequelize.DATE,
            allowNull: false
        },
        berat_badan: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status_berat_badan_usia: {
            type: Sequelize.STRING,
        },
        panjang_badan: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status_panjang_badan_usia: {
            type: Sequelize.STRING,
        },
        status_berat_badan_panjang_badan: {
            type: Sequelize.STRING,

        },
        
        uuid_petugas: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
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

    return DataPemeriksaanBaduta;
};
