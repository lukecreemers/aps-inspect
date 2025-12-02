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

export const MapScalarFieldEnumSchema = z.enum(['id','clientId','name','width','height','metadata','createdAt','updatedAt']);

export const MapImageScalarFieldEnumSchema = z.enum(['id','mapId','imageUrl','imageType','createdAt','updatedAt']);

export const LocationScalarFieldEnumSchema = z.enum(['id','clientId','isActive','name','address','metadata','createdAt','updatedAt']);

export const BuildingScalarFieldEnumSchema = z.enum(['id','clientId','locationId','isActive','name','facilityNumber','accessInformation','metadata','createdAt','updatedAt']);

export const RoofScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const RoofInspectionScalarFieldEnumSchema = z.enum(['id','roofId','reportId','reportWorkUnitId','area','typeId','condition','paintCondition','color','metadata','createdAt','updatedAt']);

export const RoofTypeScalarFieldEnumSchema = z.enum(['id','code','description','uoaCodeNumber','isActive']);

export const GutterScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const GutterInspectionScalarFieldEnumSchema = z.enum(['id','gutterId','reportId','reportWorkUnitId','length','typeId','condition','metadata','createdAt','updatedAt']);

export const GutterTypeScalarFieldEnumSchema = z.enum(['id','code','description','uoaCodeNumber','isActive']);

export const SubstrateScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const SubstrateInspectionScalarFieldEnumSchema = z.enum(['id','substrateId','reportId','reportWorkUnitId','typeId','condition','metadata','createdAt','updatedAt']);

export const SubstrateTypeScalarFieldEnumSchema = z.enum(['id','code','description','uoaCodeNumber','isActive']);

export const WindowScalarFieldEnumSchema = z.enum(['id','buildingId','removedAt','createdAt','updatedAt']);

export const WindowInspectionScalarFieldEnumSchema = z.enum(['id','windowId','reportId','reportWorkUnitId','typeId','condition','metadata','createdAt','updatedAt']);

export const WindowTypeScalarFieldEnumSchema = z.enum(['id','code','description','uoaCodeNumber','isActive']);

export const ReportScalarFieldEnumSchema = z.enum(['id','clientId','title','status','isSystem','createdAt','updatedAt']);

export const ReportTypeAssignmentScalarFieldEnumSchema = z.enum(['id','reportId','type']);

export const ReportBuildingScalarFieldEnumSchema = z.enum(['id','reportId','buildingId']);

export const ContractorScalarFieldEnumSchema = z.enum(['id','firstName','lastName','email','phone','isActive','createdAt','updatedAt']);

export const ReportWorkUnitScalarFieldEnumSchema = z.enum(['id','reportBuildingId','type','contractorId','contractorName','reportWorkBlockId','status','assignedAt','firstPulledAt','submittedAt','reviewedAt']);

export const ReportWorkBlockScalarFieldEnumSchema = z.enum(['id','reportId','contractorId','loginSecretText','status','createdAt','updatedAt']);

export const IssueScalarFieldEnumSchema = z.enum(['id','type','openingReportId','buildingId','createdAt','updatedAt','resolvedAt']);

export const SubIssueScalarFieldEnumSchema = z.enum(['id','issueId','createdAt','updatedAt','resolvedAt']);

export const IssueInspectionScalarFieldEnumSchema = z.enum(['id','isInitial','issueId','reportId','workUnitId','timeframe','action','description','toFix','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const MapImageTypeSchema = z.enum(['BASE','WIREFRAME','ANNOTATED','BLUEPRINT']);

export type MapImageTypeType = `${z.infer<typeof MapImageTypeSchema>}`

export const ReportTypeSchema = z.enum(['ROOF','EXTERIOR']);

export type ReportTypeType = `${z.infer<typeof ReportTypeSchema>}`

export const ReportStatusSchema = z.enum(['IN_PROGRESS','FOR_REVIEW','COMPLETED']);

export type ReportStatusType = `${z.infer<typeof ReportStatusSchema>}`

export const WorkUnitStatusSchema = z.enum(['PENDING','IN_PROGRESS','SUBMITTED']);

export type WorkUnitStatusType = `${z.infer<typeof WorkUnitStatusSchema>}`

export const WorkBlockStatusSchema = z.enum(['ASSIGNED','IN_PROGRESS','SUBMITTED']);

export type WorkBlockStatusType = `${z.infer<typeof WorkBlockStatusSchema>}`

export const TimeFrameSchema = z.enum(['IMMEDIATE','URGENT','NONURGENT']);

export type TimeFrameType = `${z.infer<typeof TimeFrameSchema>}`

export const IssueActionSchema = z.enum(['OPENED','UPDATED','RESOLVED']);

export type IssueActionType = `${z.infer<typeof IssueActionSchema>}`

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
// MAP SCHEMA
/////////////////////////////////////////

export const MapSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  name: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Map = z.infer<typeof MapSchema>

/////////////////////////////////////////
// MAP IMAGE SCHEMA
/////////////////////////////////////////

export const MapImageSchema = z.object({
  imageType: MapImageTypeSchema,
  id: z.string(),
  mapId: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MapImage = z.infer<typeof MapImageSchema>

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
// ROOF INSPECTION SCHEMA
/////////////////////////////////////////

export const RoofInspectionSchema = z.object({
  id: z.string(),
  roofId: z.string(),
  reportId: z.string(),
  reportWorkUnitId: z.string(),
  area: z.number(),
  typeId: z.string(),
  condition: z.number().int(),
  paintCondition: z.number().int().nullable(),
  color: z.string().nullable(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RoofInspection = z.infer<typeof RoofInspectionSchema>

/////////////////////////////////////////
// ROOF TYPE SCHEMA
/////////////////////////////////////////

export const RoofTypeSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: z.string(),
  uoaCodeNumber: z.string().nullable(),
  isActive: z.boolean(),
})

export type RoofType = z.infer<typeof RoofTypeSchema>

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
// GUTTER INSPECTION SCHEMA
/////////////////////////////////////////

export const GutterInspectionSchema = z.object({
  id: z.string(),
  gutterId: z.string(),
  reportId: z.string(),
  reportWorkUnitId: z.string(),
  length: z.number(),
  typeId: z.string(),
  condition: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type GutterInspection = z.infer<typeof GutterInspectionSchema>

/////////////////////////////////////////
// GUTTER TYPE SCHEMA
/////////////////////////////////////////

export const GutterTypeSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: z.string(),
  uoaCodeNumber: z.string().nullable(),
  isActive: z.boolean(),
})

export type GutterType = z.infer<typeof GutterTypeSchema>

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
// SUBSTRATE INSPECTION SCHEMA
/////////////////////////////////////////

export const SubstrateInspectionSchema = z.object({
  id: z.string(),
  substrateId: z.string(),
  reportId: z.string(),
  reportWorkUnitId: z.string(),
  typeId: z.string(),
  condition: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type SubstrateInspection = z.infer<typeof SubstrateInspectionSchema>

/////////////////////////////////////////
// SUBSTRATE TYPE SCHEMA
/////////////////////////////////////////

export const SubstrateTypeSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: z.string(),
  uoaCodeNumber: z.string().nullable(),
  isActive: z.boolean(),
})

export type SubstrateType = z.infer<typeof SubstrateTypeSchema>

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

/////////////////////////////////////////
// WINDOW INSPECTION SCHEMA
/////////////////////////////////////////

export const WindowInspectionSchema = z.object({
  id: z.string(),
  windowId: z.string(),
  reportId: z.string(),
  reportWorkUnitId: z.string(),
  typeId: z.string(),
  condition: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type WindowInspection = z.infer<typeof WindowInspectionSchema>

/////////////////////////////////////////
// WINDOW TYPE SCHEMA
/////////////////////////////////////////

export const WindowTypeSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: z.string(),
  uoaCodeNumber: z.string().nullable(),
  isActive: z.boolean(),
})

export type WindowType = z.infer<typeof WindowTypeSchema>

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  status: ReportStatusSchema,
  id: z.string(),
  clientId: z.string(),
  title: z.string(),
  isSystem: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// REPORT TYPE ASSIGNMENT SCHEMA
/////////////////////////////////////////

export const ReportTypeAssignmentSchema = z.object({
  type: ReportTypeSchema,
  id: z.string(),
  reportId: z.string(),
})

export type ReportTypeAssignment = z.infer<typeof ReportTypeAssignmentSchema>

/////////////////////////////////////////
// REPORT BUILDING SCHEMA
/////////////////////////////////////////

export const ReportBuildingSchema = z.object({
  id: z.string(),
  reportId: z.string(),
  buildingId: z.string(),
})

export type ReportBuilding = z.infer<typeof ReportBuildingSchema>

/////////////////////////////////////////
// CONTRACTOR SCHEMA
/////////////////////////////////////////

export const ContractorSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Contractor = z.infer<typeof ContractorSchema>

/////////////////////////////////////////
// REPORT WORK UNIT SCHEMA
/////////////////////////////////////////

export const ReportWorkUnitSchema = z.object({
  type: ReportTypeSchema,
  status: WorkUnitStatusSchema,
  id: z.string(),
  reportBuildingId: z.string(),
  contractorId: z.string().nullable(),
  contractorName: z.string().nullable(),
  reportWorkBlockId: z.string().nullable(),
  assignedAt: z.coerce.date().nullable(),
  firstPulledAt: z.coerce.date().nullable(),
  submittedAt: z.coerce.date().nullable(),
  reviewedAt: z.coerce.date().nullable(),
})

export type ReportWorkUnit = z.infer<typeof ReportWorkUnitSchema>

/////////////////////////////////////////
// REPORT WORK BLOCK SCHEMA
/////////////////////////////////////////

export const ReportWorkBlockSchema = z.object({
  status: WorkBlockStatusSchema,
  id: z.string(),
  reportId: z.string(),
  contractorId: z.string(),
  loginSecretText: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ReportWorkBlock = z.infer<typeof ReportWorkBlockSchema>

/////////////////////////////////////////
// ISSUE SCHEMA
/////////////////////////////////////////

export const IssueSchema = z.object({
  type: ReportTypeSchema,
  id: z.string(),
  openingReportId: z.string(),
  buildingId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  resolvedAt: z.coerce.date().nullable(),
})

export type Issue = z.infer<typeof IssueSchema>

/////////////////////////////////////////
// SUB ISSUE SCHEMA
/////////////////////////////////////////

export const SubIssueSchema = z.object({
  id: z.string(),
  issueId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  resolvedAt: z.coerce.date().nullable(),
})

export type SubIssue = z.infer<typeof SubIssueSchema>

/////////////////////////////////////////
// ISSUE INSPECTION SCHEMA
/////////////////////////////////////////

export const IssueInspectionSchema = z.object({
  timeframe: TimeFrameSchema.nullable(),
  action: IssueActionSchema,
  id: z.string(),
  isInitial: z.boolean(),
  issueId: z.string(),
  reportId: z.string(),
  workUnitId: z.string(),
  description: z.string(),
  toFix: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type IssueInspection = z.infer<typeof IssueInspectionSchema>
