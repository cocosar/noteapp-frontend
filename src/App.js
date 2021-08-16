import React, { useState, useEffect /* useRef */ } from "react";
// import Note from "./components/Note"
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
// import NoteForm from "./components/NoteForm"
import Togglable from "./components/Togglable";
import noteService from "./services/notes";
import loginService from "./services/login";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
    // const [notes, setNotes] = useState([]);
    // const [showAll, setShowAll] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    /* const [loginVisible, setLoginVisible] = useState(false) */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    // const noteFormRef = useRef();

    useEffect(() => {
        dispatch(initializeNotes());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(user)
            );
            noteService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    // const addNote = (event) => {
    //     // noteFormRef.current.toggleVisibility();
    //     // noteService.create(noteObject).then((returnedNote) => {
    //     //     setNotes(notes.concat(returnedNote));
    //     // });
    //     event.preventDefault();
    //     const content = event.target.note.value;
    //     event.target.note.value = "";
    //     dispatch(createNote(content));
    // };

    // const toggleImportance = (id) => {
    //     // const note = notes.find((n) => n.id === id);
    //     // const changedNote = { ...note, important: !note.important };
    //     // noteService
    //     //     .update(id, changedNote)
    //     //     .then((returnedNote) => {
    //     //         setNotes(
    //     //             notes.map((note) => (note.id !== id ? note : returnedNote))
    //     //         );
    //     //     })
    //     //     .catch(() => {
    //     //         setErrorMessage(
    //     //             `Note '${note.content}' was already removed from server`
    //     //         );
    //     //         setTimeout(() => {
    //     //             setErrorMessage(null);
    //     //         }, 5000);
    //     //     });
    //     dispatch(toggleImportanceOf(id));
    // };

    const loginForm = () => {
        return (
            <Togglable buttonLabel="log in">
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleSubmit={handleLogin}
                />
            </Togglable>
        );
    };

    // const noteForm = () => (
    //     <Togglable buttonLabel="new note" ref={noteFormRef}>
    //         <NewNote createNote={addNote} />
    //     </Togglable>
    // );

    // const notesToShow = showAll
    //     ? notes
    //     : notes.filter((note) => note.important);

    const LogState = () => {
        return (
            <>
                {user === null ? (
                    loginForm()
                ) : (
                    <div>
                        <p>{user.name} is logged in</p>
                    </div>
                )}
            </>
        );
    };

    const Navbar = () => {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/notes">Notes</Link>
                <Link to="/users">Users</Link>
            </div>
        );
    };

    return (
        <Router>
            <Navbar />

            <Switch>
                <Route path="/notes">
                    <h2>Notes</h2>
                </Route>
                <Route path="/users">
                    <h2>Users</h2>
                </Route>
                <Route path="/">
                    {/* <h2>Home</h2> */}
                    <h1>Notes</h1>
                    <Notification message={errorMessage} />
                    <LogState />
                    <NewNote />
                    <VisibilityFilter />
                    <Notes />
                </Route>
            </Switch>

            <Footer />
        </Router>
    );
};

export default App;
