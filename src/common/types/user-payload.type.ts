export interface UserPayload {
  id: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserPayload;
  }
}
