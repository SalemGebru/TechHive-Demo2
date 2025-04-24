import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

import { useEffect } from "react";

export default function ItStaffDashboard(){
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/scripts.bundle.js";
        script.async = true;
        script.onload = () => {
          if (window.KTApp && typeof window.KTApp.init === "function") {
            window.KTApp.init();
          }
        };
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script); 
        };
      }, []);
    return(
        <>
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <div className="app-wrapper" id="kt_app_wrapper">
            <Sidebar/>
            <div className="main-content">
                <Header />
                <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                                    <div className="app-container container-xxl d-flex flex-stack">
                                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                            <h1 className="page-heading text-dark fw-bold fs-3 my-0">
                                                IT Staff Dashboard
                                            </h1>
                                            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                                                <li className="breadcrumb-item text-muted">
                                                    <a href="/" className="text-muted text-hover-primary">Home</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <span className="bullet bg-gray-400 w-5px h-2px"></span>
                                                </li>
                                                <li className="breadcrumb-item text-muted">IT Staff Dashboard</li>
                                            </ul>
                                        </div>
                                    </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid">
                    <h1>Welcome to IT Staff Dashboard</h1>
                </div>
                <Footer/>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}