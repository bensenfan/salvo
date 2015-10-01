Meteor.startup(function () {
  // drawing a grid
  // code from http://jsfiddle.net/6qkdP/2/
  function setupNewBoard(size){
    var i=0;
    var $board = $('table#board');
    for (var r=0;r<size+1;++r){ 
      //create rows
      var $tr = $('<tr id=row_'+r+'></tr>');
      $board.append($tr);
      for (var c=64;c<size+65;++c){ 
        //create cells, 65=A in ASCII code
        var cellId = c>=65 ? String.fromCharCode(c)+r : ''//using ASCII code to construct A1, A2...B1, B2, ...
        var $cell = $('<td class="board-cell" id='+cellId+' data-cell-id='+cellId+'></td>');
        $tr.append($cell);
        text = '';
        if (r === 0){
          text = c>=65 ? String.fromCharCode(c) : '';
        } else if (c===64) {
          text = r;
        } else {
          text = cellId;
        }
        $cell.html(text);
      }
    }
  }

  function setupExistingBoard(setup){
    return true //TBD
  }

  Meteor.call('createBoard', 'player1', 'player2', function(err, board){
    if (err) {
      console.log(err);
    } else {
      if (board.status === 'new') {
        console.log(board);

        setupNewBoard(board.size); 
      } else {
        setupExistingBoard(board.setup); //to be written
      }
    }
  })
});

Template.body.helpers({
  /*tasks: function () {
    if (Session.get("hideCompleted")) {
      // If hide completed is checked, filter tasks
      return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
      // Otherwise, return all of the tasks
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Tasks.find({checked: {$ne: true}}).count();
  }*/
});

Template.body.events({
  "submit .new-task": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call('addTask', text)

    // Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
});

/*Template.task.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteTask", this._id);
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivate", this._id, ! this.private);
  }
});*/

Template.board.events({
  "click td.board-cell": function(event, template){
    console.log("You clicked on square", template.$(event.target).data('cellId'));
    template.$(event.target).toggleClass('clicked');
  }
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});