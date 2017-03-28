/**
 * Created by jon on 3/28/17.
 */
// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function (message) {
    Errors.insert({message: message});
};