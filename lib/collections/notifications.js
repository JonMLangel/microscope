/**
 * Created by curtis on 29/03/17.
 */
Notifications= new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
                fieldNames.length === 1 && fieldNames[0] === 'read';

    }
});

createCommentNotification = function (comment) {
    let post = Posts.findOne(comment.postId);
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
}
};