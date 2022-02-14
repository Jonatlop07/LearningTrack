import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLogger } from '@infrastructure/adapter/persistence/typeorm/logger/typeorm.logger';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmDirectory } from '@infrastructure/adapter/persistence/typeorm/typeorm.directory';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => ({
        name: 'default',
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        logging: config.get('DB_ENABLE_LOG') ? 'all' : false,
        logger: config.get('DB_ENABLE_LOG') ? TypeOrmLogger.new() : undefined,
        entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`],
        migrationsRun: true,
        migrations: [`${TypeOrmDirectory}/migration/**/*{.ts,.js}`],
        migrationsTransactionMode: 'all'
      })
    })
  ]
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
