import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { ActorService } from './actor/actor.service';
import { DirectorService } from './director/director.service';
import { DirectorController } from './director/director.controller';
import { DirectorModule } from './director/director.module';
import { PlatformModule } from './platform/platform.module';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ActorModule, DirectorModule, PlatformModule, UserModule, FilmModule, CategoryModule],
  controllers: [AppController, DirectorController],
  providers: [AppService, ActorService, DirectorService],
})
export class AppModule {}
