export var Config = {
  server: "localhost", // or "localhost"
  authentication: {
    type: "default",
    options: {
      userName: "iCrashUser",
      password: "012345",
    },
  },
  options: {
    database: "iCrash",
    trustServerCertificate: true,
    rowCollectionOnDone: true,
    useColumnNames: true,
    port: 1433,
  },
};
