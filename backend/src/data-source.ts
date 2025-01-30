import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
// import { Account } from './entities/account.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*.entity.js'],
  // entities: ['dist/entities/*.entity.js'],
  // migrations: ['dist/migrations/*.js'],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
