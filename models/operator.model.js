export default (sequelize, Sequelize) => {
    const Operator = sequelize.define("operator",{
        uuid:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        nik: {
            type: Sequelize.CHAR(16),
            
        },
        name: {
            type: Sequelize.STRING,
            
        },
        tanggal_lahir: {
            type: Sequelize.DATE,
            
        },
        jenis_kelamin: {
            type: Sequelize.STRING,
            
        },
        kecamatan: {
            type: Sequelize.CHAR(7),
            
        },
        kelurahan: {
            type: Sequelize.CHAR(10),
            
        },
        email: {
            type: Sequelize.STRING,
            
        },
        password: {
            type: Sequelize.STRING,
            
        },
        role: {
            type: Sequelize.STRING,
            
        },
        instansi: {
            type: Sequelize.UUID,
            
        },
        petugas: {
            type: Sequelize.UUID,
            allowNull: true
        },
        last_login: {
            type: Sequelize.DATE,
            allowNull: true
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return Operator;
}