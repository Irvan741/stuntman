import db from "../models/index.js"
// instansi.find
export default (sequelize, Sequelize) => {
    const User = sequelize.define("user",{
        uuid:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            
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
        // kecamatan?kelurahan
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
            type: Sequelize.STRING,
            allowNull: true
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
    User.prototype.getInstansi = async (id) => {
        return await db.instansi.findOne({where:
            {name: id}
    });
    }
    return User;
}