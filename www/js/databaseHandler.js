var databaseHandler = 
{
	db: null,
	createDatabase: function(callback) // creates fuction to add the databaseHandler
	{
		this.db = window.openDatabase("questions.db", 1.0,"question database", 1000000); // names database and establishes size
		this.db.transaction(
			function(tx)
			{
                tx.executeSql("drop table if exists Questions");
				// creates the table that we will use for the questions
				tx.executeSql( "CREATE TABLE if not exists Questions (ID integer primary key,inquisition varchar(255) NOT NULL, a1 varchar(255) NOT NULL, a2 varchar(255) NOT NULL,a3 varchar(255),a4 varchar(255), correct varchar(2) NOT NULL, Explanation varchar(255) NOT NULL, type varchar(255) NOT NULL);", [],
					function(tx, results) {}, function(tx, error)
					{
						console.log("Error while creating table" +error.message); // reports error if something goes wrong in the console
					})
			},
			function(error)
			{
				console.log("transaction error" + error.message); // error reporting for transaction error
			},
			function()
			{
				console.log("created database successfully"); // successfully reported 
			}
							); // end transaction 
        callback();
	} // end create database function
};// end database handler. 