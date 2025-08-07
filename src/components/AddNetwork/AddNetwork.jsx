import axios from "axios";
import Header from "../SectionHeader/Header.jsx";
import AddNetworkForm from "./AddNetworkForm";
import SearchIpAddress from "./SearchIPAddress";
import { useState,useEffect } from "react";


export default function AddNetwork() {

    return (
        <>
            <div className="page-container">

                {/* Header */}
                <Header headerName="Add Network" />

                {/* IP search Bar */}
                <SearchIpAddress/>

                {/* Add Network Form */}
                <AddNetworkForm />
            </div>
        </>
    )
}

