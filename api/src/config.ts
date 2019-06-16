const { NODE_ENV } = process.env;
const config = `./config/config.${NODE_ENV || 'development'}.ts`;
export default require(config);
