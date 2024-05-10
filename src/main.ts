import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Api')
  .setDescription("Endpoints documentation")
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)

  const port = process.env.PORT || 4200

  await app.listen(port);
  console.log(`app running at port ${port}`);
}
bootstrap();
