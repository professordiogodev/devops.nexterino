// next.config.js
const desired = process.env.DESIRED_PATH;
module.exports = {
  basePath: desired && desired !== '/' ? desired : '',
  // reduces the runtime footprint so our Docker image is smaller
  output: 'standalone'
};
