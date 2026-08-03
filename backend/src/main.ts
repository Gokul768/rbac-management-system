import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("RBAC API")
    .setDescription("Role Based Access Control API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  
  SwaggerModule.setup(
    "api",
    app,
    document,
  );


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );


  // Enable Frontend connection
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });


  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();