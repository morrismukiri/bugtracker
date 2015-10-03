
if (Meteor.isClient) {
    Router.route('/', function () {
        Session.setDefault('showAdd', 0);
        Session.setDefault('showEdit', 0);
        Session.setDefault('show', 'all');
        toggleAdd = function (show) {
            show = typeof show !== 'undefined' ? show : !Session.get('showAdd');
            Session.set('showAdd', show);
        };
        Meteor.subscribe('issues');
        Template.body.events({
            'click #addBtn': function (event) {
                event.preventDefault();
                //console.log('clicked')
                toggleAdd();
            }

        });
        Template.addIssue.events({
            "submit #newIssue": function (event) {
                event.preventDefault();
                var bugData = {
                    title: event.target.bugTitle.value,
                    details: event.target.details.value,
                    reportedTime: Date(),
                    reportedBy: 'Morris',
                    closed: false
                };

                Meteor.call('addIssue', bugData);
                console.log(bugData);
                event.target.bugTitle.value = '';
                event.target.details.value = '';
                //toggleAdd(false)
            }

        });

        Template.registerHelper('formatDate', function (d) {
            return moment(new Date(d)).fromNow();
        })
        Template.registerHelper('currentBug', function () {
            console.log(this._id);
            console.log('je');
            return this;

        });
        Template.body.helpers({
            showAdd: function () {
                return Session.get('showAdd')
            },
            //showEdit: function(){ return Session.get('showEdit')},
            issues: function () {
                var show = Session.get('show');
                var where = {};

                if (show === 'closed') {
                    where = {closed: true};
                } else if (show === 'open') {
                    where = {closed: false};
                } else {
                    where = {};
                }
                return issues.find(where,{sort: {reportedTime: 1}});
            }
        });
        Template.body.rendered = function () {
            $('.modal-trigger').leanModal();
            $(document).ready(function () {

                $(".button-collapse").sideNav({
                    menuWidth: 180, // Default is 240
                    edge: 'left', // Choose the horizontal origin
                    closeOnClick: false // Close
                });
                Parse.initialize("U0cie5lWDUboGQGADMHbM3tVTRS3OGmiR0yt8twq", "hCt6ubIU3DdO7CR8yUsbrCgawsS0FBWq22fQ9j4v");
                $('head').append('<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>');
            });
        }
        Template.issue.events({
            'submit .saveEdit': function (event) {
                event.preventDefault();
                console.log('Saved ' + this._id);
                issues.update(this._id, {
                    $set: {
                        title: event.target.bugTitle.value,
                        details: event.target.details.value
                    }
                });
            },
            'change .completeCheck': function (event) {
                console.log('Bug fixed');
                issues.update(this._id, {
                    $set: {
                        closed: event.currentTarget.checked
                    }
                });
            }
        });
        Template.sidenav.events({
            'click #all': function (event) {
                event.preventDefault();
                console.log('showing all issues');
                Session.set('show', 'all');
            },
            'click #resolved': function (event) {
                event.preventDefault();
                console.log('showing closed issues only');
                Session.set('show', 'closed');
            },
            'click #current': function (event) {
                event.preventDefault();
                console.log('showing open issues only');
                Session.set('show', 'open');

            }
        });
    });
}