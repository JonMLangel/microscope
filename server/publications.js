/**
 * Created by curtis on 27/03/17.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});