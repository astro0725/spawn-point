const { auth } = require('firebase-admin');

const firebaseAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const decodedToken = await auth().verifyIdToken(token);
        req.firebaseUserId = decodedToken.uid;
        req.firebaseUserName = decodedToken.name;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};

module.exports = firebaseAuth;