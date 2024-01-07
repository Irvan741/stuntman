export default (sequelize, Sequelize) => {
    const KCatin = sequelize.define("k_catin",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        uuid_pemeriksaan:{
            type: Sequelize.CHAR(36)
        },
        berisiko: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return KCatin;
}