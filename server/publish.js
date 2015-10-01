Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

// find all boards where this user is one of the players
Meteor.publish("boards", function(){
	return Boards.find({
		players: {
			$in: [this.userId]
		}
	})
})