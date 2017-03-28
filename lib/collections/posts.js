/**
 * Created by curtis on 27/03/17.
 */
Posts = new Mongo.Collection("posts");

Posts.allow({
    insert: function(userId, doc) {
        return !! userId;
    }
});