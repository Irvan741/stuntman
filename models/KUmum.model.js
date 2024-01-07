export default (sequelize, Sequelize) => {
    const KUmum = sequelize.define("k_umum",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        berat_badan: {
            type: Sequelize.FLOAT,
        },
        tinggi_badan: {
            type: Sequelize.FLOAT,
        },
        indeks_massa_tubuh: {
            type: Sequelize.FLOAT,
        },
        status_indeks_massa_tubuh: {
            type: Sequelize.STRING,
        },
        lingkar_lengan_atas: {
            type: Sequelize.FLOAT,
        },
        status_lingkar_lengan_atas: {
            type: Sequelize.STRING,
        },
        terpapar_rokok: {
            type: Sequelize.BOOLEAN,
        },
        kadar_hemoglobin:{
            type: Sequelize.FLOAT,
        },
        status_kadar_hemoglobin: {
            type: Sequelize.STRING,
        },
        riwayat_penyakit: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        status_riwayat_penyakit: {
            type: Sequelize.STRING,
            allowNull: true
        },
        uuid_pemeriksaan: {
            type: Sequelize.CHAR(36)
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return KUmum;
}