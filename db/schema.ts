import { defineRelations } from "drizzle-orm";
import {
  text,
  boolean,
  uuid,
  pgTable,
  varchar,
  timestamp,
  unique,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";


export const EmployeeRoleEnum = pgEnum("employee_role_enum", ['LABOR', 'DRIVER', 'HELPER'])


export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 256 }).notNull(),
  password: text("password").notNull(),
  fullName: varchar("fullName", { length: 256 }).notNull(),
  userName: varchar("userName", { length: 256 }).notNull(),
  tenantId : uuid("tenant_id").references(()=>tenants.id, {onDelete:"cascade"}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const groups = pgTable("groups", {
    id: uuid("id").primaryKey().defaultRandom(),
    groupName : text("group_name").notNull(),
    tenantId : uuid("tenant_id").references(()=>tenants.id, {onDelete:"cascade"}),
    createdAt : timestamp("created_at").defaultNow().notNull(),
    updatedAt : timestamp("updated_at").defaultNow().$onUpdate(()=>new Date())
}, (table)=>({
    uniqueGroupNamePerTenant : unique("unique_group_name_per_tenant").on(table.groupName, table.tenantId)
}))

export const sectors = pgTable("sectors", {
    id: uuid("id").primaryKey().defaultRandom(),
    sectorNumber : text("sector_number").notNull(),
    tenantId : uuid("tenant_id").references(()=>tenants.id).notNull(),
    createdAt : timestamp("created_at").defaultNow().notNull(),
    updatedAt : timestamp("updated_at").defaultNow().$onUpdate(()=>new Date())
},(table)=>({
    uniqueSectorNumberPerTenant : unique("unique_sector_number_per_tenant").on(table.sectorNumber, table.tenantId)
}))

export const employees = pgTable("employees", {
    id : uuid("id").primaryKey().defaultRandom(),
    fullName : varchar("fullname", {length:255}).notNull(),
    fatherName: varchar("father_name", { length: 255 }).notNull(),
    mobileNo: varchar("mobile_no", { length: 15 }).notNull(),
    role : EmployeeRoleEnum("role").notNull(),
    dob : date("dob").notNull(),
    ifPf : boolean("is_pf").default(false).notNull(),
    groupId: uuid("group_id").references(() => groups.id, { onDelete: "set null" }),
  sectorId: uuid("sector_id").references(() => sectors.id, { onDelete: "set null" }),
  registeredById: uuid("registered_by").references(() => users.id, { onDelete: "restrict" }),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
    createdAt : timestamp("created_at").defaultNow().notNull(),
    updatedAt : timestamp("updated_at").defaultNow().$onUpdate(()=>new Date())

})


export const schemaRelation = defineRelations({users, employees, groups, sectors,  tenants,}, (r)=>({
  employees:{
    tenant :r.one.tenants({
      from : r.employees.tenantId,
      to : r.tenants.id
    }),
    group:r.one.groups({
      from : r.employees.groupId,
      to : r.groups.id
    }),
    sector : r.one.sectors({
      from : r.employees.sectorId,
      to : r.sectors.id
    }),
    users : r.one.users({
      from : r.employees.registeredById,
      to : r.users.id
    })
  },
  groups : {
    tenant : r.one.tenants({
      from : r.groups.tenantId,
      to : r.tenants.id
    }),
    employees : r.many.employees()
  },
  sectors: {
      tenant: r.one.tenants({
        from: r.sectors.tenantId,
        to: r.tenants.id,
      }),
      employees: r.many.employees(),
    },
    tenants: {
      employees: r.many.employees(),
      groups: r.many.groups(),
      sectors: r.many.sectors(),
      users: r.many.users(),
    },
    users: {
      tenant: r.one.tenants({
        from: r.users.tenantId,
        to: r.tenants.id,
      }),
      employees: r.many.employees(),
    },
}))