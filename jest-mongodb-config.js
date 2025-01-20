export default {
  mongodbMemoryServerOptions: {
    binary: {
      skipMD5: true
    },
    autoStart: false,
    instance: {
      dbName: 'ai-techspike-cursor-backend'
    }
  },
  mongoURLEnvName: 'MONGO_URI',
  useSharedDBForAllJestWorkers: false
}
