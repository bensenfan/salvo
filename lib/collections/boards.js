Boards = new Mongo.Collection("boards");

/*var startBoard = {
    	players: [player1_id, player2_id],
    	setup: {
    		player1: {
    			"2-ship": [],
    			"3-ship": [[], []],
    			"4-ship": [],
    			"5-ship": []
    		},
    		player2: {
    			"2-ship": [],
    			"3-ship": [[], []],
    			"4-ship": [],
    			"5-ship": []
    		}
    	},
    	created_at: new Date(); 
    }*/

Meteor.methods({
	createBoard : function(player1_id, player2_id, cb){
		// Make sure the user is logged in before inserting a task
    /*if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }*/
    var newBoard_id = Boards.insert({
    	players: [player1_id, player2_id],
    	setup: {
    		player1: {
    			"2-ship": [],
    			"3-ship": [[], []],
    			"4-ship": [],
    			"5-ship": []
    		},
    		player2: {
    			"2-ship": [],
    			"3-ship": [[], []],
    			"4-ship": [],
    			"5-ship": []
    		}
    	},
    	status: 'new', // 'new', 'in_progress', 'complete'
    	size: 10, //default 10, could also be 8 (small) or 12 (large)
    	created_at: new Date()
    });

    return Boards.findOne(newBoard_id);
	},
	
	deleteBoard: function(boardId){
		throw new Meteor.Error('function not yet implemented');
	},

	setBoard: function(boardId, setup){
		var board = Boards.findOne(boardId);

		// sset up board
		Boards.update(boardId, {$set: {setup: setup}});
	}
})

/*if (Meteor.isServer && Boards.find().count() === 0) {
  Meteor.startup(function() {
    Boards.insert(startBoard);
  });
}*/