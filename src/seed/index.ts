import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { seedIfEmpty } from './seedIfEmpty'

async function main() {
  const payload = await getPayload({ config })
  await seedIfEmpty(payload)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
