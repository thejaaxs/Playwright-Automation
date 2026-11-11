
module.exports = {
  default: {
    paths: ['features/**/*.feature'],

    requireModule: [
      'ts-node/register'
    ],

    require: [
      'src/step-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],

    format: [
      'progress'
    ],

    publishQuiet: true
  }
};
