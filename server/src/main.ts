import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    try {
        const PORT = process.env.PORT || 5050;
        const app = await NestFactory.create(AppModule);
        app.enableCors();

        const config = new DocumentBuilder()
            .setTitle('Music Api')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);

        await app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrap();
