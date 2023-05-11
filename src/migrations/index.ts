import { getClientWithKeyspace } from '@database/config';
import { KEYSPACE, MIGRATE } from '@migrations/cql-config';
import { logger } from '@utils/logger';

const main = async () => {
  const client = await getClientWithKeyspace();
  logger.info('Creating keyspace...');
  await client.execute(KEYSPACE);
  logger.info('Keyspace created');
  logger.info('Migrating database...');
  for (const query of MIGRATE) {
    logger.info(`query = ${query}`);
    await client.execute(query);
  }
  logger.info('Database migrated');

  return client;
};
main()
  .then(client => client.shutdown())
  .catch(err => console.log(err));
