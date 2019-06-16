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
      'mongodb+srv://admin:admin@cluster0-ung1x.mongodb.net/test?retryWrites=true&w=majority'
  },
  consign: {
    verbose: false,
    extensions: ['.js', '.json', '.node', '.ts']
  }
};
