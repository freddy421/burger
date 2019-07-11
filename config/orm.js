// Import MySQL connection.
var connection = require("../config/connection");


function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			arr.push(key + "=" + value);
		}
	}
	// translate array of strings to a single comma-separated string
	return arr.toString();
}

// READ/SELECT all the records in the database
var orm = {
  all: function(tableInput, br) {
    var queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      br(result);
    });
  },

  // CREATE/INSERT a new record to the database
  // ===========================================================
  create: function(table, cols, vals, br) {
    var queryString = 'INSERT INTO ' + table;

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      br(result);
    });
  },

  // UPDATE the database
  update: function(table, objColVals, condition, br) {
    var queryString = 'UPDATE ' + table;

    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      br(result);
    });
  },

  // DELETE a specific record in the database
  delete: function(table, condition, br) {
    var queryString = 'DELETE FROM ' + table;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      br(result);
    });
  },
};

// Export the orm object for the model 
module.exports = orm;