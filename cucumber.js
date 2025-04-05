module.exports = {
    default: {
      require: ["src/steps/*.ts"],
      requireModule: ["ts-node/register"],
      format: ["progress-bar"],
      paths: ["src/features/*.feature"]
    }
  };
  