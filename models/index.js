import dbConfig from '../configs/db.js';
import Sequelize from 'sequelize';
import Baduta from './baduta.model.js';
import DataPemeriksaanBaduta from './dataPemeriksaanBaduta.model.js';
import DataPenduduk from './dataPenduduk.model.js';
import Instansi from './instansi.model.js';
import JenisInstansi from './jenisInstansi.model.js';
import KBumil from './KBumil.model.js';
import KPascaPersalinan from './KPascaPersalinan.model.js';
import KPengantin from './KPengantin.model.js';
import KUmum from './KUmum.model.js';
import LevelInstansi from './levelInstansi.model.js';
import Operator from './operator.model.js';
import PembagianTTD from './PembagianTTD.model.js';
import Pemeriksaan from './pemeriksaan.model.js';
import Pengantin from './pengantin.models.js';
import TransaksiTTD from './transaksiTTD.model.js';
import Users from './users.model.js';
import Kecamatan from './kecamatan.model.js';
import Kelurahan from './kelurahan.model.js';
import RefreshToken from './refreshToken.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.baduta = Baduta(sequelize, Sequelize);
db.dataPemeriksaanBaduta = DataPemeriksaanBaduta(sequelize, Sequelize);
db.dataPenduduk = DataPenduduk(sequelize, Sequelize);
db.instansi = Instansi(sequelize, Sequelize);
db.jenisInstansi = JenisInstansi(sequelize, Sequelize);
db.kBumil = KBumil(sequelize, Sequelize);
db.kPascaPersalinan = KPascaPersalinan(sequelize, Sequelize);
db.kPengantin = KPengantin(sequelize, Sequelize);
db.kUmum = KUmum(sequelize, Sequelize);
db.levelInstansi = LevelInstansi(sequelize, Sequelize);
db.operator = Operator(sequelize, Sequelize);
db.pembagianTTD = PembagianTTD(sequelize, Sequelize);
db.pemeriksaan = Pemeriksaan(sequelize, Sequelize);
db.pengantin = Pengantin(sequelize, Sequelize);
db.refreshToken = RefreshToken(sequelize, Sequelize);
db.transaksiTTD = TransaksiTTD(sequelize, Sequelize);
db.users = Users(sequelize, Sequelize);

db.kecamatan = Kecamatan(sequelize, Sequelize);
db.kelurahan = Kelurahan(sequelize, Sequelize);

export default db;

// ns02.cloudhost.id