export default (sequelize, Sequelize) => {
    const PembagianTTD = sequelize.define("pembagian_ttd", {
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        uuid_petugas: {
            type: Sequelize.STRING,
            
        },
        tgl_pelaksanaan: {
            type: Sequelize.DATE,
            
        },
        jml_tablet: {
            type: Sequelize.INTEGER,
            
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

    return PembagianTTD;
}
