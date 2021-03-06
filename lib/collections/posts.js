/**
 * Created by curtis on 27/03/17.
 */
Posts = new Mongo.Collection("posts");

Posts.allow({
    update: function (userId, post) { return ownsDocument(userId, post); },
    remove: function (userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        let errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

validatePost = function (post) {
    let errors = {};

    if (!post.title)
        errors.title = "Please fill in a headline";

    if (!post.url)
        errors.url = "Please fill in a URL";

    return errors;
};

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        let errors = validatePost(postAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

        let postWithSameLink = Posts.findOne({url: postAttributes.url});
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
            submitted: new Date(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });

        let postId = Posts.insert(post);

        return {
            _id: postId
        }
    },
    upvote: function(postId) {
        check(this.userId, String);
        check(postId, String);

        let post = Posts.findOne(postId);
        if (!post)
            throw new Meteor.Error('invalid', 'Post not found');

        if (_.include(post.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvotes this post');

        Posts.update(post._id, {
            $addToSet: {upvoters: this.userId},
            $inc: {votes:1}
        });
    }
});