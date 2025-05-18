// init-replica.js
rs.initiate({
  _id: "rs0", 
  members: [
    { _id: 0, host: "mongo_db-part2:27017" }  // Use the Mongo container name
  ]
});
