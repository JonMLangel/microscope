/**
 * Created by jon on 3/28/17.
 */
Template.postsList.helpers({
    posts: function () {
        return Posts.find({}, {sort: {submitted: -1}});
    }
});