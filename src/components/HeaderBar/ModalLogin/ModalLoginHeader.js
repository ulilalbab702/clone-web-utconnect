import { Modal } from "@material-ui/core";
import React, { useState } from "react";

const ModalLogin = ({ isOpen, login }) => {
    const [username, setUsername] = useState("testutconnect@gmail.com");
    const [password, setPassword] = useState("Scania,2020");

    const dataLogin = { username, password };

    return (
        <Modal open={isOpen} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={() => login()} style={{ backgroundColor: "#fff", height: "50vh", width: "30vw", display: 'flex', flexDirection: 'column' }}>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    value={password}
                    placeholder="Passsword"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </Modal>
    );
};

export default ModalLogin;