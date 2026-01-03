
The project critically uses Prisma 6.19+, downgraded from v7 for deployment stability. It is mandatory to use PgBouncer in production environments, and Prisma Accelerate is disabled. Key commands have been aliased for convenience: `pnpm db:generate`, `pnpm db:push`, `pnpm db:migrate`, and `pnpm db:studio`.
