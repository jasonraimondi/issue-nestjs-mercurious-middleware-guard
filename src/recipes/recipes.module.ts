import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { DemoMiddleware } from "../__demo";

@Module({
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(DemoMiddleware)
      .forRoutes("(.*)");
  }
}
