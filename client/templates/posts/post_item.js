/**
 * Created by curtis on 27/03/17.
 */

Template.postItem.helpers({
    ownPost: () => {
        return this.userId === Meteor.userId();
    },
    domain: () => {
        let a = document.createElement("a");
        a.href = this.url;
        return a.hostname;
    },
    commentsCount: () => {
        return Comments.find({postId: this._id}).count();
    }
});


