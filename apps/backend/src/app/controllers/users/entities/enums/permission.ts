import { registerEnumType } from "@nestjs/graphql";

export enum Permission {
  ADMIN = "ADMIN",
  USER = "USER",
}

registerEnumType(Permission, { name: "Permission" });
