import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import alanBtn from "@alan-ai/alan-sdk-web";
import { database } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

function App() {
    const [update, setUpdate] = useState(false);
    const databaseRef = collection(database, "todo-voice");

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_KEY, //YOUR_KEY_FROM_ALAN_STUDIO_HERE
            onCommand: (commandData) => {
                // Call the client code that will react to the received command
                addDoc(databaseRef, { item: commandData.data }).then(() => {
                    setUpdate(true);
                });
            },
        });
    }, []);

    return (
        <div>
            <Todo
                databaseRef={databaseRef}
                update={update}
                setUpdate={setUpdate}
            />
        </div>
    );
}

export default App;
