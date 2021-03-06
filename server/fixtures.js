/**
 * Created by curtis on 27/03/17.
 */
if (Posts.find().count() === 0) {
    let now = new Date().getTime();

    // create two users
    let tomId = Meteor.users.insert({
        profile: { name: 'Tom Coleman' }
    });
    let tom = Meteor.users.findOne(tomId);
    let sachaId = Meteor.users.insert({
        profile: { name: 'Sacha Greif' }
    });
    let sacha = Meteor.users.findOne(sachaId);

    let telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sacha._id,
        author: sacha.profile.name,
        url: 'http://sachagreif.com/intrducing-telescope/',
        submitted: new Date(now - 7 * 3600 * 1000),
        commentsCount: 2,
        upvoters: [],
        votes: 0
    });

    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: new Date(now - 5 * 3600 * 1000),
        body: 'Interesting project Sacha, can I get involved?'
    });

    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.profile.name,
        submitted: new Date(now - 3 * 3600 * 1000),
        body: 'You sure can Tom!'
    });

    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://meteor.com',
        submitted: new Date(now - 10 * 3600 * 1000),
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });

    Posts.insert({
        title: 'The Meteor Book',
        userId: sacha._id,
        author: sacha.profile.name,
        url: 'http://themeteorbook.com',
        submitted: new Date(now - 12 * 3600 * 1000),
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });

    for (let i = 0; i < 31; i++) {
        Posts.insert({
            title: 'Test post #' + i,
            author: sacha.profile.name,
            userId: sacha._id,
            url: 'http://google.com/?q=test-' + i,
            submitted: new Date(now - i * 3600 * 1000),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
    }

}