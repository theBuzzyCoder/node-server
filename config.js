var environments = {};

environments.staging = {
  'port': {
    'http': 8000,
    'https': 4430
  },
  'envName': 'staging'
};

environments.production = {
  'port': {
    'http': 8080,
    'https': 5000
  },
  'envName': 'production'
};

var currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

var envToExport = typeof(environments[currentEnv]) === 'object' ?  environments[currentEnv] : 'staging';

module.exports = envToExport;
