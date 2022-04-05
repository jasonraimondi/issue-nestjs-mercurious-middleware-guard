# nest-mercurious-middleware-guard

Starting with the [33-graphql-mercurius](https://github.com/nestjs/nest/tree/master/sample/33-graphql-mercurius)

See the [diff adding the DemoMiddleware and DemoGuard](https://github.com/jasonraimondi/nest-mercurious-middleware-guard/commit/850cbf40073b48b6bbd2cf754f1320fdb09e273d)

```bash
pnpm i
pnpm start:dev
```

```bash
open http://localhost:3000/graphiql
```

Query for recipies

```graphql
query {
  recipes {
    id
    title
  }
}
```

Our middleware is [attaching the user to the response](https://github.com/jasonraimondi/nest-mercurious-middleware-guard/blob/main/src/__demo.ts#L8).

After querying for the recipes, there is no [GUARD USER](https://github.com/jasonraimondi/nest-mercurious-middleware-guard/blob/main/src/__demo.ts#L17-L18) on the response


```bash
middleware has run
attached user to request
GRAPHQL CONTEXT USER undefined
GUARD USER undefined
```

I've also added a [context function to graphql](https://github.com/jasonraimondi/nest-mercurious-middleware-guard/blob/main/src/app.module.ts#L15-L23) to add the user here, and it is also undefined

```typescript
GraphQLModule.forRoot<MercuriusDriverConfig>({
  ...
  context: (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;
    console.log("GRAPHQL CONTEXT USER", user);
    return {
      user,
      req: request,
      res: reply,
    };
  },
})
```
