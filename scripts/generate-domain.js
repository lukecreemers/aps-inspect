const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const domain = args[0];
const hasQuery = args.includes('--query');

if (!domain || domain.startsWith('--')) {
  console.error('Please provide a domain name (e.g., client, building)');
  process.exit(1);
}

// Helper for PascalCase (e.g., "inspection-item" -> "InspectionItem")
const toPascalCase = (str) =>
  str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

const domainPascal = toPascalCase(domain);
const domainKebab = domain.toLowerCase(); 

const baseDir = path.join(__dirname, '../packages/shared-types/src', domainKebab);

const indexContent = [
  `export * from "./dto/create-${domainKebab}.dto";`,
  `export * from "./dto/update-${domainKebab}.dto";`,
  hasQuery ? `export * from "./dto/get-${domainKebab}-query.dto";` : null,
  `export * from "./output/${domainKebab}.output";`,
].filter(Boolean).join('\n') + '\n';

const files = {
  'index.ts': indexContent,
  [`output/${domainKebab}.output.ts`]: `import { z } from "zod";
import { ${domainPascal}Schema } from "../../generated/zod";

export const ${domainPascal}ResponseSchema = ${domainPascal}Schema.omit({
  createdAt: true,
  updatedAt: true,
}).strip();

export type ${domainPascal}Response = z.infer<typeof ${domainPascal}ResponseSchema>;
`,
  [`dto/create-${domainKebab}.dto.ts`]: `import { z } from "zod";

export const Create${domainPascal}Schema = z.object({
  // TODO: Add fields here
});

export type Create${domainPascal}Dto = z.infer<typeof Create${domainPascal}Schema>;
`,
  [`dto/update-${domainKebab}.dto.ts`]: `import { z } from "zod";

export const Update${domainPascal}Schema = z.object({
  // TODO: Add fields here
});

export type Update${domainPascal}Dto = z.infer<typeof Update${domainPascal}Schema>;
`,
};

if (hasQuery) {
  files[`dto/get-${domainKebab}-query.dto.ts`] = `import { z } from "zod";
import { PaginationSchema } from "../../helpers/pagination.dto";

export const Get${domainPascal}sQuerySchema = PaginationSchema.extend({
  // TODO: Add fields here
});

export type Get${domainPascal}sQueryDto = z.infer<typeof Get${domainPascal}sQuerySchema>;
`;
}

// Create directories
['dto', 'output'].forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

// Write files
Object.entries(files).forEach(([filename, content]) => {
  const filePath = path.join(baseDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`Skipped file (exists): ${filePath}`);
  }
});

console.log(`\nDone! Don't forget to export "./${domainKebab}" in packages/shared-types/src/index.ts`);
