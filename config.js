var environments = {};

environments.staging = {
  'port': {
    'http': 8000,
    'https': 4430
  },
  'envName': 'staging',
  'hashingSecret': 'Secr3t'
};

environments.production = {
  'port': {
    'http': 8080,
    'https': 5000
  },
  'envName': 'production',
  'hashingSecret': 'S3cr3tPr0d'
};

var currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

var envToExport = typeof(environments[currentEnv]) === 'object' ?  environments[currentEnv] : 'staging';

module.exports = envToExport;
