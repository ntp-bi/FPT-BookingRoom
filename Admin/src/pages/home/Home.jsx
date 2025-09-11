import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../list/List";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <>
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="main">
                        <List />
                    </div>
                </div>
            </>
        </div>
    );
};

export default Home;
