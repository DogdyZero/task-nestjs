import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfig } from './config/postgres.config';
import { TaskCrudModule } from './task-usercase/task-usercase.module';


@Module({
  imports: [
    TaskCrudModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig]
    })
  ],
})
export class AppModule { }
