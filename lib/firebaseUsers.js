const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    });

    async function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
            console.log('user', userRecord.toJSON());
            // Here, you can call a function to save this user to MySQL
            saveUserToMySQL(userRecord.uid, userRecord.displayName);
        });
        if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
        }
        })
        .catch((error) => {
        console.log('Error listing users:', error);
    });
}