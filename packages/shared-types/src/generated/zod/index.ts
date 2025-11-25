import { z } from 'zod';
import { Prisma } from '../../../../../apps/backend/node_modules/@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.NullTypes.DbNull;
  if (v === 'JsonNull') return Prisma.NullTypes.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.string(), z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.any() }),
    z.record(z.string(), z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ClientScalarFieldEnumSchema = z.enum(['id','name','metadata','createdAt','updatedAt']);

export const LocationScalarFieldEnumSchema = z.enum(['id','clientId','isActive','name','address','metadata','createdAt','updatedAt']);

export const BuildingScalarFieldEnumSchema = z.enum(['id','clientId','locationId','isActive','name','facilityNumber','accessInformation','metadata','createdAt','updatedAt']);

export const RoofScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const GutterScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const SubstrateScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const WindowScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Client = z.infer<typeof ClientSchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  isActive: z.boolean(),
  name: z.string(),
  address: z.string().nullable(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// BUILDING SCHEMA
/////////////////////////////////////////

export const BuildingSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  locationId: z.string().nullable(),
  isActive: z.boolean(),
  name: z.string(),
  facilityNumber: z.string().nullable(),
  accessInformation: z.string().nullable(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Building = z.infer<typeof BuildingSchema>

/////////////////////////////////////////
// ROOF SCHEMA
/////////////////////////////////////////

export const RoofSchema = z.object({
  id: z.string(),
  buildingId: z.string(),
  removedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Roof = z.infer<typeof RoofSchema>

/////////////////////////////////////////
// GUTTER SCHEMA
/////////////////////////////////////////

export const GutterSchema = z.object({
  id: z.string(),
  buildingId: z.string(),
  removedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Gutter = z.infer<typeof GutterSchema>

/////////////////////////////////////////
// SUBSTRATE SCHEMA
/////////////////////////////////////////

export const SubstrateSchema = z.object({
  id: z.string(),
  buildingId: z.string(),
  removedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Substrate = z.infer<typeof SubstrateSchema>

/////////////////////////////////////////
// WINDOW SCHEMA
/////////////////////////////////////////

export const WindowSchema = z.object({
  id: z.string(),
  buildingId: z.string(),
  removedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Window = z.infer<typeof WindowSchema>
