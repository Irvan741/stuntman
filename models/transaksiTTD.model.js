export default(sequelize, Sequelize) => {
    const TransaksiTTD = sequelize.define("transaksi_ttd", {
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        uuid_pembagian_ttd: {
            type: Sequelize.STRING,
            
        },
        uuid_petugas:{
            type: Sequelize.STRING,
            allowNull: true
        },
        nama_sekolah: {
            type: Sequelize.STRING,
        },
        nik_remaja: {
            type: Sequelize.STRING,
            
        },
        berat_badan: {
            type: Sequelize.FLOAT,
            
        },
        tinggi_badan: {
            type: Sequelize.FLOAT,
            
        },
        tgl_pemberian: {
            type: Sequelize.DATE,
            
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            onUpdate: Sequelize.NOW
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    return TransaksiTTD;
}
