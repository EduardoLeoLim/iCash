export var Config = {
  server: "25.1.116.116", // or "localhost"
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
