export var Config = {
  server: "localhost", // or "localhost"
  options: {},
  authentication: {
    type: "default",
    options: {
      userName: "icrash",
      password: "012345",
    },
  },
  options: {
    database: "icrash",
    trustServerCertificate: true,
    rowCollectionOnDone: true,
    useColumnNames: true,
    port: 1433,
  },
};
