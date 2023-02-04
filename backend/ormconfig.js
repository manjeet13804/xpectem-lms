const config = require('config');

const baseDir = process.env.NODE_ENV === 'production' ? 'dist/src' : 'src';

const {
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize,
  logging,
  namingStrategy,
} = config.get('typeorm');

module.exports = {
  type,

  host,
  port,
  username,
  password,
  database,

  entities: [
    `${baseDir}/entity/*.{ts,js}`,
    `${baseDir}/modules/**/*.entity.{ts,js}`,
  ],
  migrations: [`${baseDir}/database/@migrations/*.{ts,js}`],
  seeds: [`${baseDir}/database/seeds/*.seed.ts`],

  synchronize,
  logging,

  cli: {
    migrationsDir: `${baseDir}/database/@migrations`,
  },

  namingStrategy,
};
