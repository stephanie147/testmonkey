import { Module , HttpModule} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    /**
     * Here we can import either the common HttpModule or the one we defined.
     * It doesn't matter as long as our module is at least imported once (for instance in the AppModule)
     */
    HttpModule,
],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
