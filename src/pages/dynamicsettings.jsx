import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Footer from "../components/Footer"

import { useNavigate } from "react-router-dom"

export default function DynamicSettings(){
    const navigate=useNavigate();
    return(
        <>
            <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
    <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
    
    <div className="app-wrapper" id="kt_app_wrapper">
        <Sidebar />
        
                <div className="main-content">
                <Header />
                <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
            <div
              id="kt_app_toolbar_container"
              className="app-container container-xxl d-flex flex-stack"
            >
                <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                <h1 className="page-heading text-dark fw-bold fs-3 my-0">
                  Dynamic Settings
                </h1>
                <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                  <li className="breadcrumb-item text-muted">
                    <a
                      href="/"
                      className="text-muted text-hover-primary"
                    >
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <span className="bullet bg-gray-400 w-5px h-2px"></span>
                  </li>
                  <li className="breadcrumb-item text-muted">Dynamic Settings</li>
                </ul>
                </div>
            </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
            <div id="kt_app_content_container " className="app-container container-xxl d-flex justify-space-between align-items-center gap-5">
            <div class="card shadow-sm hover-scale w-50">
    <div class="card-header">
        <h3 class="card-title">Edit Template</h3>
        <div class="card-toolbar">
            <button type="button" class="btn btn-sm btn-light" onClick={()=>navigate('/iddetails')}>
                Go to settings
            </button>
        </div>
    </div>
    
    
</div>
<div class="card shadow-sm hover-scale w-50">
    <div class="card-header">
        <h3 class="card-title">Edit Organization Details</h3>
        <div class="card-toolbar">
            <button type="button" class="btn btn-sm btn-light" onClick={()=>navigate('/dynamicdetails')}>
                Go to settings
            </button>
        </div>
    </div>
    
    
</div>
            </div>
            
            </div>
            <Footer/>
                </div>

        </div>
        </div>
        </div>
        </>
    )
}