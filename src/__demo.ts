import { CanActivate, ExecutionContext, Injectable, NestMiddleware } from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

@Injectable()
export class DemoMiddleware implements NestMiddleware {
  async use(req: FastifyRequest, _: FastifyReply, next: () => void): Promise<void> {
    console.log("middleware has run")
    req.user = { exists: true };
    console.log("attached user to request")
    next();
  }
}

@Injectable()
export class DemoGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    console.log("GUARD USER", req.user);
    return true;
  }

}
