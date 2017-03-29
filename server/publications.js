/**
 * Created by curtis on 27/03/17.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
    return Notification.find();
});