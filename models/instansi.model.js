import db from "../models/index.js"
export default (sequelize, Sequelize) => {
    const Instansi = sequelize.define("instansi",{
        uuid:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kecamatan: {
            type: Sequelize.CHAR(7),
            allowNull: false
        },
        kelurahan: {
            type: Sequelize.CHAR(10),
            allowNull: false
        },
        jenis_instansi: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        level_instansi: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    Instansi.prototype.getKecamatan = async (id) => {
        return await db.kecamatan.findOne({where:
            {id: id}
        });
    }
    Instansi.prototype.getKelurahan = async (id) => {
        return await db.kelurahan.findOne({where:
            {id: id}
        });
    }
    return Instansi;
}

