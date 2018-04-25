'use strict';

module.exports = (config, utils, connect) => {
  
  	let <%= name %> = connect.Model.extend({
    	tableName: '<%= name %>'
  	});

  	return <%= name %>;
};
