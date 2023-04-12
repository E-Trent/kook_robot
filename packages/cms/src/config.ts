import type { CodegenConfig } from "@graphql-codegen/cli";
import { env, url } from "./env";
const option = {
  headers: {
    Authorization: `Bearer ${env.CONTENTFUL_TOKEN}`,
  },
};
const config: CodegenConfig = {
  schema: [
    {
      [url]: option,
    },
    // "src/schema.graphql",
  ],
  documents: ["src/**/*.gql"],
  generates: {
    "src/generated.ts": {
      plugins: [
        {
          add: {
            content:
              'import type { DocumentNode } from "graphql/language/ast";',
          },
        },
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        scalars: {
          Dimension: "number",
          Quality: "number",
          HexColor: "string",
          DateTime: "string",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["pnpm eslint --fix"],
  },
};

export default config;
