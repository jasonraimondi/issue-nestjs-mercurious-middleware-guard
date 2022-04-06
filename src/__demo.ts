import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { FastifyReply, FastifyRequest } from "fastify";

export function demoMiddleware (req: FastifyRequest, _: FastifyReply, next: () => void): void {
  console.log("middleware has run")
  req.user = { exists: true };
  console.log("attached user to request")
  next();
}

@Injectable()
export class DemoGuard implements CanActivate {
  async canActivate (context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    console.log("GUARD USER", req.raw.user);
    return true;
  }

}
