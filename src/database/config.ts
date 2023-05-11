import { Command } from 'commander';
import * as cassandra from 'cassandra-driver';

const KEYSPACE = 'public';

export const dbConfig = (name: string) => {
  const program: any = new Command();
  program.name(name).version('1.0.0');

  return program
    .option('-h, --hosts [hosts...]', ['127.0.0.1'])
    .option('-u, --username <username>', 'Password based authentication username')
    .option('-p, --password <password>', 'Password based authentication password')
    .option('-d, --datacenter <datacenter>', 'Local data center');
};

export const getClient = async (config: any) => {
  const client = new cassandra.Client({
    contactPoints: config.hosts,
    localDataCenter: config.datacenter || 'datacenter1',
    keyspace: KEYSPACE,
  });

  await client.connect();
  return client;
};

export const getClientWithKeyspace = async () => {
  const options = dbConfig('scylladb-poc').parse().opts();
  return await getClient(options);
};
