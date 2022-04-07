import { CanActivate, ExecutionContext, Injectable, NestMiddleware } from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class ClassDemoMiddleware implements NestMiddleware {
  async use(req: FastifyRequest, _: FastifyReply, next: () => void): Promise<void> {
    console.log("class middleware has run")
    req.classuser = { exists: true };
    console.log("class middleware done")
    next();
  }
}

export function fnDemoMiddleware(request: FastifyRequest, _: FastifyReply, next: () => void) {
  console.log("fn middleware has run")
  request.fnuser = { exists: true };
  console.log("fn middleware done")
  next();
}

@Injectable()
export class DemoGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    // @ts-ignore
    const user = req.classuser ?? req.raw.classuser ?? req.fnuser ?? req.raw.fnuser;
    console.log("class user user", req.classuser, "fn - user", req.fnuser);
    // @ts-ignore
    console.log("raw user", req.raw.classuser, "raw fn - raw user", req.raw.fnuser);
    console.log({ user })
    return !!user;
  }

  getRequest(context: ExecutionContext): FastifyRequest {
    return context.switchToHttp().getRequest<FastifyRequest>();
  }
}

export class DemoGraphQLGuard extends DemoGuard {
  getRequest(context: ExecutionContext): FastifyRequest {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}