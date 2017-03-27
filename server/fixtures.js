/**
 * Created by curtis on 27/03/17.
 */
if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'introducing Telescope',
        url: 'http://google.com'
    });

    Posts.insert({
        title: 'meteor',
        url: 'http://meteor.com'
    });

    Posts.insert({
        title: 'the Meteor Book',
        url: 'http://themeteorbook.com'
    });
}