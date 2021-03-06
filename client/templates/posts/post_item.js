/**
 * Created by curtis on 27/03/17.
 */

Template.postItem.helpers({

    ownPost: function() {
        return this.userId === Meteor.userId();
    },

    domain: function() {
        let a = document.createElement("a");
        a.href = this.url;
        return a.hostname;
        },
    upvotedClass: function () {
        let userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        }   else {
            return 'disabled';
        }
    }
});

Template.postItem.events({
    'click .upvote': function(e) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
});


