import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./controllers/users/users.module";
import { FirebaseAuthStrategy } from "./middleware/firebase.auth";
import { FirebaseGuard } from "./middleware/firebase.guard";
import { ExchangesModule } from "./controllers/exchanges/exchanges.module";
import { InstrumentsModule } from "./controllers/instruments/instruments.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "apps/backend/src/app/schema.gql"),
      definitions: {
        path: join(process.cwd(), "apps/backend/src/app/types/graphql.ts"),
      },
    }),
    UsersModule,
    ExchangesModule,
    InstrumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseGuard, FirebaseAuthStrategy],
})
export class AppModule {}
