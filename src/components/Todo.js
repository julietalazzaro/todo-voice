import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { getDocs, doc, deleteDoc } from "firebase/firestore";
import { database } from "../firebase-config";

const Todo = ({ databaseRef, update, setUpdate }) => {
    const [todoList, setTodoList] = useState([]);

    const getData = async () => {
        let data = await getDocs(databaseRef);
        setTodoList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    };

    useEffect(() => {
        getData();
        setUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);

    const deleteItems = (id) => {
        const data = doc(database, "todo-voice", id);
        deleteDoc(data).then(() => {
            getData();
        });
    };

    return (
        <div className="todo-main">
            <h2 className="header">Voice-based Todo Application</h2>
            <div className="todo-card">
                {todoList.map((todo) => {
                    return (
                        <div key={todo.id} className="todo-list">
                            <h3 className="todo-item">{todo.item}</h3>
                            <FiX
                                className="close-icon"
                                onClick={() => deleteItems(todo.id)}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                <p>
                    Source:{" "}
                    <a href="https://www.freecodecamp.org/news/build-a-voice-based-weather-application-using-react-and-alan-ai/">
                        Nishant Kumar - freeCodeCamp
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Todo;
