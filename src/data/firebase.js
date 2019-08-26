import firebase from "firebase"

const config = {
    databaseURL: "https://todo-app-77.firebaseio.com",
    projectId: "todo-app-77",
};

const db = firebase.initializeApp(config).firestore();

export default db;
