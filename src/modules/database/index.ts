import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export class DatabaseConfig {
  static getDatabaseConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      synchronize: true,
      autoLoadEntities: true,
      ssl: getSSLType(configService.get('DB_SSL') || 'false'),
      // logging: true,
    };
  }
}

const getSSLType = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return input === 'true' ? true : false;
  }
};

export const forDatabasePostgresAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleAsyncOptions> =>
    DatabaseConfig.getDatabaseConfig(configService), // Call the getPostgresConfig method
  inject: [ConfigService],
};
