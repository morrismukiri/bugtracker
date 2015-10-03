/**
 * Created by morris on 10/3/15.
 */
if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.methods({
        addIssue: function (bugData) {
            issues.insert(bugData);
        },
        findIssues: function (show) {
            var where = {};

            if (show === 'closed') {
                where = {closed: true};
            } else if (show === 'open') {
                where = {closed: false};
            } else {
                show = {};
            }
            console.log(show);
            console.log(where);
            return issues.find(where, {sort: {reportedTime: 1}});
        }
    });
    Meteor.publish('issues', function(){
        return issues.find();
    });
}
