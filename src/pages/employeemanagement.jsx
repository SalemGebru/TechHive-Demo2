import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { useState } from "react"

import { createProfile,getProfile,updateProfile,deleteProfile,deleteProfileBunch, } from "../features/profileSlice"
import { generateIdBunch } from "../features/idCardSlice";
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function EmployeeManagement() {
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

    const dispatch=useDispatch();
    const [selectedUsers,setSelectedUsers]=useState({});
    const [startSelection,setStartSelection]=useState(false);
    const {profiles}=useSelector((state=>state.profile));
    const [selectedFilter,setSelectedFilter]=useState("show all");
    const [filteredData,setFilteredData]=useState([]);

    const [isCreateModalOpen,setIsCreateModalOpen]=useState(false);
    const [isEditModalOpen,setIsEditModalOpen]=useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false);
    const [isIdModalOpen,setIsIdModalOpen]=useState(false);

    const [formData,setFormData]=useState({
                en_name:'',
                title:'',
                sex:'',
                date_of_birth:'',
                joined_date:'',
                email:'',
                photo:'',
                phone_number:'',
                organization_unit:'',
                job_position:'',
                job_title_category:'',
                salary_id:'',
                marital_status:'',
                nation:'',
                employment_id:'',
                job_position_start_date:'',
                job_position_end_date:'',
                address:'',
                house_number:'',
                region:'',
                zone:'',
                woreda:'',
                status:'',
                id_issue_date:'',
                id_expire_date:'',
                id_status:''
    })
	const[profileData,setProfileData]=useState({
		en_name:FormData?.en_name || "",
		title:FormData?.title || "",
		sex:FormData?.sex || "",
		date_of_birth:FormData?.date_of_birth || "",
		joined_date:FormData?.joined_date || "",
    email:FormData?.email || "",
		photo:FormData?.photo || "",
		phone_number:FormData?.phone_number || "",
		organization_unit:FormData?.organization_unit || "",
		job_position:FormData?.job_position || "",
		job_title_category:FormData?.job_title_category || "",
		salary_id:FormData?.salary_id || "",
		marital_status:FormData?.marital_status || "",
		nation:FormData?.nation || "",
		employment_id:FormData?.employment_id || "",
		job_position_start_date:FormData?.job_position_start_date || "",
		job_position_end_date:FormData?.job_position_end_date || "",
		address:FormData?.address || "",
		house_number:FormData?.house_number || "",
		region:FormData?.region || "",
		zone:FormData?.zone || "",
});

useEffect(() => {
setProfileData(formData);

}, []);
    const [employeeProfile,setEmployeeProfile]=useState([]);
    const [selectedUser,setSelectedUser]=useState({});
    const [searchItem,setSearch]=useState('');

    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=5;

    const totalPages=Math.ceil(employeeProfile.length/itemsPerPage);

    const lastItemIndex=currentPage*itemsPerPage;
    const firstItemIndex=lastItemIndex-itemsPerPage;
    const currentdata=employeeProfile.slice(firstItemIndex,lastItemIndex);

    const nextPage=()=>{
        console.log(currentPage)
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
        }
        
    }

    const prevPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1);
        }
    }

	const handleChange=(e)=>{
        setProfileData({...profileData,[e.target.name]:[e.target.value]});
        setFormData({...formData,[e.target.name]:[e.target.value]});
        console.log(formData);
    }

    useEffect(() => {
      const users = Object.values(profileData || {}); 
    
      if (selectedFilter === "show all") {
        setFilteredData(users);
      } else {
        const filtered = users.filter(
          (data) => data.id_status?.toLowerCase() === selectedFilter.toLowerCase()
        );
        setFilteredData(filtered);
      }
    }, [selectedFilter, profileData]);
    
   
    useEffect(() => { 
            dispatch(getProfile())
                .then((data) => {
                    const dataitem=data.payload;
                    setEmployeeProfile(dataitem)
                    console.log(employeeProfile);
                })
                .catch((error) => {
                    console.log('Error fetching data', error);
                });
        }, [dispatch,profiles]);
    
    const imageUploader=(e)=>{
        const file=e.target.files[0];
        if(file){
            const reader=new FileReader();
            reader.onloadend=()=>{
                setFormData({...formData,photo:reader.result});
            }
            reader.readAsDataURL(file);
        }
    }

    const handleCreateProfile=()=>{
        dispatch(createProfile(formData));
        setIsCreateModalOpen(false);
    }

    const handleUpdateProfile=(id)=>{
        console.log(id);
        dispatch(updateProfile({Id:id,FormData:formData}));
        setIsEditModalOpen(false);
    }

    const handleDeleteProfile=(id)=>{
        dispatch(deleteProfile({Id:id}));
        setIsDeleteModalOpen(false);
    }

    const handleSelectedRows = (rowId) => {
      setSelectedUsers((prev) => {
          const updatedSelection = {
              ...prev,
              [rowId]: !prev[rowId], 
          };
      const hasSelectedRows = Object.values(updatedSelection).some((isSelected) => isSelected);

      setStartSelection(hasSelectedRows); 

      return updatedSelection;
  })};

  const handleDeleteBunch = () => {
    console.log(selectedUsers); 
    dispatch(deleteProfileBunch(selectedUsers)).then((data) => {
      console.log("Updated Users:", data.payload); 
    });
  };
  

  return (
    <>
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
    <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
    
    <div className="app-wrapper" id="kt_app_wrapper">
        <Sidebar />

        <div className="main-content">
        <Header />
          {/* Toolbar */}
          <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
            <div
              id="kt_app_toolbar_container"
              className="app-container container-xxl d-flex flex-stack"
            >
              {/* Title and Breadcrumbs */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                <h1 className="page-heading text-dark fw-bold fs-3 my-0">
                  Employee Management
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
                  <li className="breadcrumb-item text-muted">Employee Management</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="d-flex align-items-center gap-2 gap-lg-3">
                <a
                  href="#"
                  className="btn btn-sm fw-bold btn-primary"
				  onClick={(e) => {
					e.preventDefault();
					setIsCreateModalOpen(true);
				  }}
                >
                  Add Employee
                </a>
                <a
                  href="#"
                  className={startSelection?"btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary":"hide"}
                  onClick={handleDeleteBunch}
                >
                  Delete Employees
                </a>
                <a
                  href="#"
                  className={startSelection?"btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary":"hide"}
				  onClick={(e) => {
					e.preventDefault();
					setIsIdModalOpen(true);
				  }}
                >
                  Issue bunch ids
                </a>
              </div>
                                        {isCreateModalOpen && (
                                  <div
                                    className="modal fade show"
                                    tabIndex="-1"
                                    id="kt_modal_scrollable_1"
                                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                                  >
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5 className="modal-title">Add Employee</h5>
                                          
                                        </div>

                                        <fieldset>
                                            <legend>Profile Details</legend>
                                      <img src={formData.photo}/>
                                            <input type="file" onChange={imageUploader}></input>
                                            <form className="p-5 bg-white rounded shadow-sm">
                                  <div className="row g-4">
                                    {/* Name */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Name</label>
                                      <input type="text" name="en_name" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Title */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Title</label>
                                      <input type="text" name="title" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Sex */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Sex</label>
                                      <select className="form-select" name="gender" onChange={handleChange}>
                                        <option value="">Select...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                      </select>
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Date of Birth</label>
                                      <input type="date" name="date_of_birth" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Joined Date */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Joined Date</label>
                                      <input type="date" name="joined_date" className="form-control" onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Email</label>
                                      <input type="email" name="email" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Phone Number</label>
                                      <input type="tel" name="phone_number" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Organization Unit */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Organization Unit</label>
                                      <input type="text" name="organization_unit" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Job Position */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Job Position</label>
                                      <input type="text" name="job_position" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Job Title Category */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Job Title Category</label>
                                      <input type="text" name="job_title_category" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Salary ID */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Salary ID</label>
                                      <input type="text" name="salary_id" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Marital Status */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Marital Status</label>
                                      <select className="form-select" name="marital_status" onChange={handleChange}>
                                        <option value="">Select...</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                      </select>
                                    </div>

                                    {/* Nation */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Nation</label>
                                      <input type="text" name="nation" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Employment ID */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Employment ID</label>
                                      <input type="text" name="employment_id" className="form-control" onChange={handleChange} required />
                                    </div>

                                    {/* Job Position Start */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Job Position Start Date</label>
                                      <input type="date" name="job_position_start_date" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Job Position End */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Job Position End Date</label>
                                      <input type="date" name="job_position_end_date" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Address */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Address</label>
                                      <input type="text" name="address" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* House Number */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">House Number</label>
                                      <input type="text" name="house_number" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Region */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Region</label>
                                      <input type="text" name="region" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Zone */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Zone</label>
                                      <input type="text" name="zone" className="form-control" onChange={handleChange} />
                                    </div>

                                    {/* Woreda */}
                                    <div className="col-md-6">
                                      <label className="form-label fw-semibold">Woreda</label>
                                      <input type="text" name="woreda" className="form-control" onChange={handleChange} />
                                    </div>
                                  </div>

                                  
                                </form>

                                        </fieldset>

                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={() => setIsCreateModalOpen(false)}
                                          >
                                            Close
                                          </button>
                                          <button type="button" className="btn btn-primary" onClick={handleCreateProfile}>
                                            Save changes
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              <div className={isIdModalOpen?"modal fade":"hide"} tabindex="-1" id="kt_modal_1">
                                  <div className="modal-dialog">
                                      <div className="modal-content">
                                          

                                          <div className="modal-body">
                                              <p>Modal body text goes here.</p>
                                          </div>

                                          <div className="modal-footer">
                                              <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={()=>setIsIdModalOpen(false)}>Close</button>
                                            
                                          </div>
                                      </div>
                                  </div>
                              </div>



            </div>
          </div>

          {/* Page content goes here */}
          <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
         
                                            
          </div>
          {/*begin::Table Widget 4*/}
          <div className="card card-flush h-xl-100">
												{/*begin::Card header*/}
												<div className="card-header pt-7">
													{/*begin::Title*/}
													<h3 className="card-title align-items-start flex-column">
														<span className="card-label fw-bold text-gray-800">Employee Information</span>
														
													</h3>
													{/*end::Title*/}
													{/*begin::Actions*/}
													<div className="card-toolbar">
														{/*begin::Filters*/}
														<div className="d-flex flex-stack flex-wrap gap-4">
															{/*begin::Destination*/}
															<div className="d-flex align-items-center fw-bold">
																{/*begin::Label*/}
																<div className="text-gray-400 fs-7 me-2">Cateogry</div>
																{/*end::Label*/}
																{/*begin::Select*/}
																<select className="form-select form-select-transparent text-graY-800 fs-base lh-1 fw-bold py-0 ps-3 w-auto"
                                 data-control="select2" data-hide-search="true" data-dropdown-css-classname="w-150px" 
                                 data-placeholder="ID status" value={selectedFilter}
                                 onChange={(e) => setSelectedFilter(e.target.value)}>
																	
																	<option value="show all" >Show All</option>
																	<option value="Active">Active</option>
																	<option value="Not issued">Not issued</option>
                                  <option value="Denied">Denied</option>
																</select>
																{/*end::Select*/}
															</div>
															{/*end::Destination*/}
															{/*begin::Status*/}
															
															{/*end::Status*/}
															{/*begin::Search*/}
															<div className="position-relative my-1">
																{/*begin::Svg Icon | path: icons/duotune/general/gen021.svg*/}
																<span className="svg-icon svg-icon-2 position-absolute top-50 translate-middle-y ms-4">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
																		<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
																	</svg>
																</span>
																{/*end::Svg Icon*/}
																<input type="text" data-kt-table-widget-4="search" className="form-control w-150px fs-7 ps-12" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
															</div>
															{/*end::Search*/}
														</div>
														{/*begin::Filters*/}
													</div>
													{/*end::Actions*/}
												</div>
												{/*end::Card header*/}
												{/*begin::Card body*/}
												<div className="card-body pt-2">
													{/*begin::Table*/}
													<table className="table align-middle table-responsive table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
														{/*begin::Table head*/}
														<thead>
															{/*begin::Table row*/}
															<tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
																<th className="min-w-100px">#</th>
                                <th className="text-end min-w-100px">Profile Picture</th>
																<th className="text-end min-w-100px">Name</th>
																<th className="text-end min-w-125px">Employment ID</th>
																<th className="text-end min-w-100px">Sex</th>
                                <th className="text-end min-w-100px">Phone Number</th>
                                <th className="text-end min-w-100px">Organization Unit</th>
                                <th className="text-end min-w-100px">Job Position</th>
                                <th className="text-end min-w-100px">ID Status</th>
                                <th className="text-end min-w-100px">Actions</th>
																
															</tr>
															{/*end::Table row*/}
														</thead>
														{/*end::Table head*/}
														{/*begin::Table body*/}
														<tbody className="fw-bold text-gray-600">
															
														{Array.isArray(employeeProfile) ? (
  currentdata.length > 0 ? (
    currentdata.filter((row)=>{
      const matchSearch=searchItem.toLowerCase()===''?row:String(row.name).toLowerCase().includes(searchItem);
      const matchFilter =
  selectedFilter === 'show all' ||
  row.id_status?.toLowerCase() === selectedFilter.toLowerCase();

      return matchSearch&&matchFilter
    })
      .map((row, index) => {
        
        return (
          <tr key={index} data-kt-table-widget-4="subtable_template">
            <td>{!selectedUsers[row.employment_id]?<i className="bi bi-circle" onClick={()=>{handleSelectedRows(row.employment_id)}}></i>:
                                    <i className="bi bi-check-circle-fill" onClick={()=>{handleSelectedRows(row.employment_id)}}></i>     }</td>
			<td><img width={"100px"} height={"100px"} src={row.photo} style={{borderRadius:'50%', objectFit:'cover'}}/></td>
            
            <td className="text-end">
              {row.en_name}
            </td>
            <td className="text-end">
              {row.employment_id}
            </td>
            <td className="text-end">
              {row.sex}
            </td>
			<td className="text-end">
              {row.phone_number}
            </td>
			<td className="text-end">
              {row.organization_unit}
            </td>
			<td className="text-end">
              {row.job_position}
            </td>
			
			<td className="text-end">
              {row.id_status}
            </td>
            <td className="text-end">
            <span className="badge py-3 px-4 fs-7 badge-light-primary" onClick={()=>window.open(`http://localhost:5173/idmanagement?data=${row.employment_id}`,'_blank')}> <i className="bi bi-eye-fill"></i></span>

            
            <span className="badge py-3 px-4 fs-7 badge-light-warning" onClick={()=>{setIsEditModalOpen(true),setSelectedUser(row)}}><i className="bi bi-pencil-fill"></i></span>
            {isEditModalOpen && (
  <div
    className="modal fade show"
    tabIndex="-1"
    id="kt_modal_scrollable_1"
    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add User</h5>
          
        </div>

        <fieldset>
            <legend>Edit Details</legend>
                <form className="p-5 bg-white rounded shadow-sm">
				<img src={formData.image}/>
				<input type="file" onChange={imageUploader}></input>
				<div className="field-value">
                    <label className="field">Name</label>
                    <input
                        type="text"
                        className="value"
                        name="en_name"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Title</label>
                    <input
                        type="text"
                        className="value"
                        name="title"
                        onChange={(e)=>handleChange(e)}
                        
                    />
                </div>
                <div className="field-value">
                    <label className="field">Sex</label>
                    <select
                        className="value"
                        name="gender"
                        onClick={(e)=>handleChange(e)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="field-value">
                    <label className="field">Date of birth</label>
                    <input
                        type="date"
                        className="value"
                        name="date_of_birth"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Joined Date</label>
                    <input
                        type="date"
                        className="value"
                        name="joined_date"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div className="field-value">
                    <label className="field">Email</label>
                    <input
                        type="date"
                        className="value"
                        name="email"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>

                <div className="field-value">
                    <label className="field">Phone Number</label>
                    <input
                        type="tel"
                        className="value"
                        name="phone_number"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Organization unit</label>
                    <input
                        type="text"
                        className="value"
                        name="organization_unit"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Job Position</label>
                    <input
                        type="text"
                        className="value"
                        name="job_position"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Job title category</label>
                    <input
                        type="text"
                        className="value"
                        name="job_title_category"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Salary ID</label>
                    <input
                        type="text"
                        className="value"
                        name="salary_id"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Marital Status</label>
                    <select
                    className="value"
                    name="marital_status"
                    onChange={(e)=>handleChange(e)}
                    >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                    
                </div>
                <div className="field-value">
                    <label className="field">Nation</label>
                    <input
                        type="text"
                        className="value"
                        name="nation"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Employment ID</label>
                    <input
                        type="text"
                        className="value"
                        name="employment_id"
                        onChange={(e)=>handleChange(e)}
                        required
                    />
                </div>
                <div className="field-value">
                    <label className="field">Job Position Start Date</label>
                    <input
                        type="date"
                        className="value"
                        name="job_position_start_date"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Job Position End Date</label>
                    <input
                        type="date"
                        className="value"
                        name="job_position_end_date"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Address</label>
                    <input
                        type="text"
                        className="value"
                        name="address"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">House Number</label>
                    <input
                        type="text"
                        className="value"
                        name="house_number"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Region</label>
                    <input
                        type="text"
                        className="value"
                        name="region"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Zone</label>
                    <input
                        type="text"
                        className="value"
                        name="zone"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="field-value">
                    <label className="field">Woreda</label>
                    <input
                        type="text"
                        className="value"
                        name="woreda"
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                </form>
                    
        </fieldset>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setIsEditModalOpen(false)}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={()=>handleUpdateProfile(selectedUser.employment_id)}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}
            <span className="badge py-3 px-4 fs-7 badge-light-danger" onClick={()=>{setSelectedUser(row),setIsDeleteModalOpen(true)}}><i className="bi bi-trash"></i></span>
            {isDeleteModalOpen && (
  <div
    className="modal fade show"
    tabIndex="-1"
    id="kt_modal_scrollable_1"
    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
  >
    <div className="modal-dialog">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div className="modal-header">
          
          
        </div>

        <fieldset>
            <legend>User Details</legend>
            <p>Delete User?</p>
                    
        </fieldset>

        <div className="modal-footer">
        <button
            type="button"
            className="btn btn-light"
            onClick={() => handleDeleteProfile(selectedUser.employment_id)}
          >
            Delete
          </button>

          <button
            type="button"
            className="btn btn-light"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Close
          </button>
          
        </div>
      </div>
    </div>
  </div>
)}
            </td>
          </tr>
        );
      })
  ) : (
    <tr><td colSpan="8">No data available</td></tr>
  )
) : (
  <tr>
    <td colSpan="8">No users found</td>
  </tr>
)}
														</tbody>
														{/*end::Table body*/}
													</table>
													{/*end::Table*/}
												</div>
												{/*end::Card body*/}
											</div>
											{/*end::Table Widget 4*/}

          </div>
          <ul className="pagination pagination-circle">
    <button onClick={prevPage} disabled={currentPage === 1}>
                            <i className="bi bi-chevron-double-left"></i>
                            </button>
                            <span> Page {currentPage} of {totalPages} </span>
                            <button onClick={nextPage} disabled={currentPage === totalPages}>
                            <i className="bi bi-chevron-double-right"></i>
                            </button>
</ul>
          <Footer/>
        </div>
                        
                        
      </div>
      
    </div>
    </div>
      
      
    </>
  );
}
