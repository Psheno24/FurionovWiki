import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import {
  Cases,
  FamilyMembers,
  Guides,
  Items,
  Jobs,
  Laws,
  Places,
  Updates,
  Vehicles,
} from './collections/Wiki'
import { seedIfEmpty } from './seed/seedIfEmpty'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Фурионовы Вики',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Vehicles,
    Jobs,
    Items,
    Places,
    Cases,
    Guides,
    Laws,
    FamilyMembers,
    Updates,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./furionov-wiki.db',
    },
  }),
  sharp,
  onInit: async (payload) => {
    await seedIfEmpty(payload)
  },
})
