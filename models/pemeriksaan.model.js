import db from "../models/index.js"
export default (sequelize, Sequelize) => {
    const Pemeriksaan = sequelize.define("pemeriksaan",{
        uuid:{
            type: Sequelize.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        nik_penduduk: {
            type: Sequelize.CHAR(16),
        },
        uuid_petugas: {
            type: Sequelize.CHAR(36),
        },
        nama_petugas: {
            type: Sequelize.STRING,
        },
        jenis_pemeriksaan: {
            type: Sequelize.STRING,
        },
        tgl_pemeriksaan: {
            type: Sequelize.DATE,
        },
        catatan_pemeriksaan: {
            type: Sequelize.TEXT,
        },
        penyuluhan: {
            type: Sequelize.BOOLEAN,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    Pemeriksaan.prototype.getPenduduk = async (nik) => {
        return await db.dataPenduduk.findOne({where:
            {nik: nik, deletedAt: null}
        });
    }
    Pemeriksaan.prototype.getKBumil = async (uuid) => {
        return await db.kBumil.findAll({where:
            {uuid_pemeriksaan: uuid, deletedAt: null},
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
    Pemeriksaan.prototype.getKCatin = async (uuid) => {
        return await db.kPengantin.findAll({where:
            {uuid_pemeriksaan: uuid, deletedAt: null},
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
    Pemeriksaan.prototype.getKPascaPersalinan = async (uuid) => {
        return await db.kPascaPersalinan.findAll({where:
            {uuid_pemeriksaan: uuid, deletedAt: null},
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
    Pemeriksaan.prototype.getKUmum = async (uuid) => {
        return await db.kUmum.findAll({where:
            {uuid_pemeriksaan: uuid, deletedAt: null},
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
    return Pemeriksaan;
}