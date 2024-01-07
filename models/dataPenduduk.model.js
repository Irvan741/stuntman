import db from "../models/index.js"
export default (sequelize, Sequelize) => {
    const DataPenduduk = sequelize.define("data_penduduk", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nik: {
        type: Sequelize.CHAR(16),
        allowNull: false,
        unique: true,
      },
      nama_lengkap: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      tempat_lahir: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      kecamatan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kelurahan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomor_kk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rw: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kode_pos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      golongan_darah: {
        type: Sequelize.CHAR(4),
        allowNull: true,
      },
      agama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_perkawinan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_hubungan_darah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pendidikan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pekerjaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nik_ayah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nik_ibu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anak_ke: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jumlah_saudara: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    DataPenduduk.prototype.getKecamatan = async (id) => {
      return await db.kecamatan.findOne({where:
          {id: id}
      });
    }
    DataPenduduk.prototype.getKelurahan = async (id) => {
        return await db.kelurahan.findOne({where:
            {id: id}
        });
    }
    return DataPenduduk;
  };
  