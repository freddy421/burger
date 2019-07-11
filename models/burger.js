// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  // READ/SELECT all the records in the database 
  all: function(br) {
    orm.all('burgers', function(res) {
      br(res);
    });
  },
  // CREATE/INSERT a new record to the database 
  create: function(cols, vals, br) {
    orm.create('burgers', cols, vals, function(res) {
      br(res);
    });
  },
  // UPDATE a specific record in the database 
  update: function(objColVals, condition, br) {
    orm.update('burgers', objColVals, condition, function(res) {
      br(res);
    });
  },
  // DELETE a specific record in the database 
  delete: function(condition, br) {
    orm.delete('burgers', condition, function(res) {
      br(res);
    });
  },
};

module.exports = burger;