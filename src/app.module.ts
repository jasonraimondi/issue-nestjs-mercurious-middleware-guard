import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { RecipesModule } from './recipes/recipes.module';
import { FastifyReply, FastifyRequest } from "fastify";

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: "schema.gql",
      subscription: true,
      graphiql: true,
      context: (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user;
        console.log("GRAPHQL CONTEXT USER", user);
        return {
          user,
          req: request,
          res: reply,
        };
      },
    }),
  ],
})
export class AppModule {
}
