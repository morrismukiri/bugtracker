/**
 * Created by meshack on 10/3/15.
 */
var issuesOrionOptions={
    singularName: 'post', // The name of one of these items
    pluralName: 'posts', // The name of more than one of these items
    link:{title:'Issues'},
    tabular:{
        columns:[
            {data:'title',title:'Title'},
            {data:'details',title:'Description'},
            {data:'closed',title:'status'}
        ]
    }
};

//db= new orion.collection('issues',issuesOrionOptions);
issues= new orion.collection('issues',issuesOrionOptions);

issuesSchema= new SimpleSchema({
    title:{
        type:String
    },
    details:{
        type:String
    },
    reportedTime:{
        type:Date,
        defaultValue: new Date()
    },
    reportedBy: {
        type:String,
        defaultValue:this.userId
    },
    closed: {
        type:Boolean
    }
});
issues.attachSchema(issuesSchema);
//met