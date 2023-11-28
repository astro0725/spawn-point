const db = admin.firestore();

function logEvent(eventName, eventData) {
    const docRef = db.collection('analytics').doc();
    return docRef.set({
        eventName: eventName,
        eventData: eventData,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
}

module.exports = { logEvent };