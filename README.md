Run `sudo docker-compose up -d` - creates scylladb instance locally.

Run `sudo docker exec -it scylladb_poc nodetool status` - check instance status.

Run `sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' scylladb_poc` - return hosts address.

Run `sudo docker exec -it scylladb_poc cqlsh` - opens cql editor locally.

Run `NODE1=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' scylladb_poc)` - to store host address of running instance in NODE1 variable or you can run above command and store that value in .env.

Run `npm run migrate -- --hosts $NODE1` - to migrate cql queries into scylladb.

Run `npm run dev -- --hosts $NODE1` - starts server in dev mode.