/**
 * Created by curtis on 27/03/17.
 */
Posts = new Mongo.Collection("posts");

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        let user = Meteor.user();
        let post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        let postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});