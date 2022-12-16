import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { setupSwagger } from './swagger'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (process.env.ENABLE_SWAGGER_API_DOCUMENT === '1') {
    setupSwagger(app)
  }
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // )
  await app.listen(3000)
}
bootstrap()
