export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  mongodb: {
    uri:
      'mongodb://admin:admin@cluster0-shard-00-00-ung1x.mongodb.net:27017,cluster0-shard-00-01-ung1x.mongodb.net:27017,cluster0-shard-00-02-ung1x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  },
  consign: {
    verbose: false,
    extensions: ['.js', '.json', '.node', '.ts']
  }
};
