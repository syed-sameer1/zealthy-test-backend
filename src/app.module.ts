import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forDatabasePostgresAsyncConfig } from './modules/database';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './modules/database/database.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true ,
    }),
    TypeOrmModule.forRootAsync(forDatabasePostgresAsyncConfig),
    OnboardingModule,
    AdminModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [SeederService],
})
export class AppModule {}
