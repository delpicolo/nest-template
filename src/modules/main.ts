import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import YAML from 'json2yaml';
import compression from 'compression';
dotenv.config();

const API_PORT = 3000;
const API_PREFIX = '/api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.use(compression());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  app.setGlobalPrefix(API_PREFIX);

  const options = new DocumentBuilder()
    .setTitle(process.env.APPLICATION_NAME)
    .setDescription('Template for any node project')
    .setVersion(process.env.APPLICATION_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./swagger-doc.yaml', YAML.stringify(document));
  SwaggerModule.setup('/', app, document);

  await app.listen(API_PORT);
}
bootstrap();
