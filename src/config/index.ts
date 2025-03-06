const config = {
  webPort: parseInt(process.env.WEB_PORT || '1337'),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/dev-001',
  sessionSecret: process.env.SESSION_SECRET || 'oreo',
}

export default config
