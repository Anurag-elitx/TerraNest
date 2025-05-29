db = db.getSiblingDB('terranest');

db.createCollection('users');
db.createCollection('actions');
db.createCollection('challenges');
db.createCollection('posts');
db.createCollection('organizations');

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "googleId": 1 }, { sparse: true });
db.users.createIndex({ "facebookId": 1 }, { sparse: true });

print('Database initialized successfully');