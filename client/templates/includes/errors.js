/**
 * Created by jon on 3/28/17.
 */
Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});