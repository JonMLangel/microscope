/**
 * Created by jon on 3/28/17.
 */
Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});

Template.error.onRendered(function() {
    let error = this.data;
    Meteor.setTimeout(function () {
        Errors.remove(error._id);
    }, 3000);
});