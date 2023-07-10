import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RequestLoggerMiddleware } from './middleware/request-logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: cfg.get('DBTYPE'),
        host: cfg.get('DBHOST'),
        port: cfg.get('DBPORT'),
        username: cfg.get('DBUSER'),
        password: cfg.get('DBPASSWD').toString(),
        database: cfg.get('DBNAME').toString(),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options: any) => {
        console.debug('app.module useFactory', { options });
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '999999m' },
      secret: 'some secret',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
