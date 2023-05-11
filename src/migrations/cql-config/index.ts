import * as path from 'path';
import * as fs from 'fs';

export const readCql = (cql: string): string => {
  return fs.readFileSync(path.join(__dirname, `${cql}.cql`), 'utf8');
};

export const KEYSPACE = readCql('keyspace');
export const MIGRATE = readCql('migrate')
  .split(';')
  .map(s => s.trim())
  .filter(s => s);
