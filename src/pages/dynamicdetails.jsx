import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { createOrganizationInfo,getOrganizationInfo } from "../features/organizationSlice"

export default function DynamicDetails(){
    const [isUpdating,setIsUpdating]=useState(false);
    const dispatch=useDispatch();
    const {organizationInfo}=useSelector((state)=>state.organization);

    const [formData,setFormData]=useState([{
        en_name:'',
        motto:'',
        mission:'',
        vision:'',
        core_value:'',
        logo:'',
        address:'',
        website:'',
        email:'',
        phone_number:'',
        fax_number:'',
        po_box:'',
        tin_number:'',
        abbreviation:''
    }])


    const [organizationData,setOrganizationData]=useState({
        en_name:'',
        motto:'',
        mission:'',
        vision:'',
        core_value:'',
        logo:'',
        address:'',
        website:'',
        email:'',
        phone_number:'',
        fax_number:'',
        po_box:'',
        tin_number:'',
        abbreviation:''
    })

    useEffect(()=>{
      dispatch(getOrganizationInfo()).then((data)=>{
        console.log(data);
        console.log(data.payload);
        setOrganizationData(data.payload);
        setFormData(data.payload)
      })
    },[]);

   console.log(organizationData)
   console.log(formData)

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = [...prev]; 
      updatedFormData[0] = {
        ...updatedFormData[0], 
        [name]: value 
      };
      return updatedFormData; 
    });
  };

  const imageUploader=(e)=>{
    const file=e.target.files[0];
    if(file){
        const reader=new FileReader();
        reader.onloadend=()=>{
          setFormData((prev) => {
            const updatedFormData = [...prev]; 
            updatedFormData[0] = {
              ...updatedFormData[0], 
              logo: reader.result 
            };
            return updatedFormData; 
          });
            
        }
        reader.readAsDataURL(file);
    }
}

const validateForm=(formData)=>{

      if(formData.email&&!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)){
          alert('Email format is incorrect');
          return false;
      }
      else if(formData.phone_number&&!/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(formData.phone_number)){
        alert('Phone format is incorrect');
          return false;
      }
      else return true;
    }
  

    const handleCreateInformation=(e)=>{
        e.preventDefault();
        
        if(validateForm(formData[0])){
          dispatch(createOrganizationInfo({FormData:formData[0]}));
        }
        
        
    }
    return(
        <div id="kt_app_body" data-kt-app-layout="dark-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" className="app-default">
              <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
              <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Header/>
            <div className="app-wrapper" id="kt_app_wrapper">
                <Sidebar />
                <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                    <div className="d-flex flex-column flex-column-fluid">
                      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                    <div
                      id="kt_app_toolbar_container"
                      className="app-container container-xxl d-flex flex-stack"
                    >
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading text-dark fw-bold fs-3 my-0">
                          Dynamic Details
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
                          <li className="breadcrumb-item text-muted">Dynamic Details</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                     <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="row g-5 g-xl-10">
                <form className="p-5 bg-white rounded shadow-sm">
  <div className="row g-4">
    {/* Organization name */}
    <div className="col-md-6">
      <label htmlFor="en_name" className="form-label fw-semibold">Organization Name</label>
      <input type="text" name="en_name" id="en_name" className="form-control"  onChange={handleChange} value={formData[0]?.en_name || ""}/>
    </div>

    {/* Motto */}
    <div className="col-md-6">
      <label htmlFor="motto" className="form-label fw-semibold">Motto</label>
      <input type="text" name="motto"  id="motto" className="form-control"  onChange={handleChange} value={formData[0]?.motto || ""}/>
    </div>

    {/* Mission */}
    <div className="col-md-6">
      <label htmlFor="mission" className="form-label fw-semibold">Mission</label>
      <input type="text" name="mission"  id="mission" className="form-control"  onChange={handleChange} value={formData[0]?.mission || ""}/>
    </div>

    {/* Core Values */}
    <div className="col-md-6">
      <label htmlFor="core_value" className="form-label fw-semibold">Core Values</label>
      <input type="text" name="core_value" id="core_value" className="form-control"  onChange={handleChange} value={formData[0]?.core_value || ""}/>
    </div>

    {/* Logo */}
    <div className="col-md-6">
      <label htmlFor="logo" className="form-label fw-semibold">Logo</label>
      <input type="file" name="logo"  id="logo" className="form-control"  onChange={imageUploader} />
    </div>

    {/* Website */}
    <div className="col-md-6">
      <label htmlFor="website" className="form-label fw-semibold">Website</label>
      <input type="text" name="website"  id="website" className="form-control"  onChange={handleChange} value={formData[0]?.website || ""}/>
    </div>

    {/* Email */}
    <div className="col-md-6">
      <label htmlFor="email" className="form-label fw-semibold">Email</label>
      <input type="email"  name="email" id="email" className="form-control"  onChange={handleChange} value={formData[0]?.email || ""}/>
    </div>


    <div className="col-md-6">
      <label htmlFor="address" className="form-label fw-semibold">Address</label>
      <input type="text" name="address"  id="address" className="form-control"  onChange={handleChange} value={formData[0]?.address || ""}/>
    </div>
    {/* Phone Number */}
    <div className="col-md-6">
      <label htmlFor="phone_number" className="form-label fw-semibold">Phone Number</label>
      <input type="tel" name="phone_number"  id="phone_number" className="form-control"  onChange={handleChange} value={formData[0]?.phone_number || ""}/>
    </div>

    {/* Fax Number */}
    <div className="col-md-6">
      <label htmlFor="fax_number" className="form-label fw-semibold">Fax Number</label>
      <input type="number" name="fax_number" id="fax_number" className="form-control"  onChange={handleChange} value={formData[0]?.fax_number || ""} />
    </div>

    {/* P.O. Box */}
    <div className="col-md-6">
      <label htmlFor="po_box" className="form-label fw-semibold">P.O. Box</label>
      <input type="number" name="po_box"  id="po_box" className="form-control"  onChange={handleChange} value={formData[0]?.po_box || ""}/>
    </div>

    {/* Tin Number */}
    <div className="col-md-6">
      <label htmlFor="tin_number" className="form-label fw-semibold">TIN Number</label>
      <input type="number" name="tin_number"  id="tin_number" className="form-control"  onChange={handleChange} value={formData[0]?.tin_number || ""}/>
    </div>

    {/* Abbreviation */}
    <div className="col-md-6">
      <label htmlFor="abbreviation" className="form-label fw-semibold">Abbreviation</label>
      <input type="text" name="abbreviation" id="abbreviation" className="form-control"  onChange={handleChange} value={formData[0]?.abbreviation || ""}/>
    </div>
  </div>

  
  <div className="mt-5">
  <button type="button" className="btn btn-primary" onClick={(e)=>handleCreateInformation(e)}>Update</button>
  </div>
</form>
            </div>
                    </div>
                    </div>
                
                        
        
                </div>
                </div>
                </div>
        </div>
        </div>
        <Footer/>
        </div>
    )
}