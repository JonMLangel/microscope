/**
 * Created by curtis on 27/03/17.
 */
Template.postItem.helpers({
    domain:function () {
        let a = document.createElement("a");
        a.href = this.url;
        return a.hostname;
    }
});
