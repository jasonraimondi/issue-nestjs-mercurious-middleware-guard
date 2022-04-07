import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { RecipesModule } from "./recipes/recipes.module";
import { FastifyReply, FastifyRequest } from "fastify";
import { ClassDemoMiddleware } from "./__demo";

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: "schema.gql",
      subscription: true,
      graphiql: true,
      context: (request: FastifyRequest, reply: FastifyReply) => ({
        req: request,
        res: reply
      })
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ClassDemoMiddleware)
      .forRoutes("(.*)");
  }
}
