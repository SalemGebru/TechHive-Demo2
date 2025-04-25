import { useEffect,useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { useState } from 'react'
import React from 'react'
import html2canvas from 'html2canvas';


import { getProfile,generateId,getTemplate} from '../features/idCardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Stage,Layer,Text,Image,Group,Image as KonvaImage,Circle} from 'react-konva'

export default function IdManagement() {
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
      document.body.removeChild(script); // clean up
    };
  }, []);

  const dispatch=useDispatch()
  const { idCards } = useSelector((state) => state.idCard);
  const [image, setImage] = useState(null);
  const [isCreateModalOpen,setIsCreateModalOpen]=useState(false);
  const [userProfile,setUserProfile]=useState([]);
  const [extractData,setExtractData]=useState([]);
  const [id,setId]=useState();
  const [selectedTemplate,setSelectedTemplate]=useState("front");
  const [templates,setTemplates]=useState({
      front:{
          photo:{
            xPosition:30,
            yPosition:80,
            image_width:150,
            image_height:150,
            has_mask:false,
            mask_color:'black',
            mask_thickness:0,
            is_circle:false,
            circle_diameter:0,
            circle_background:null
          },
          en_name:{
              text_positionx:400,
              text_positiony:80,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Name',
              field_name:'en_name',
              
          },
          job_position:{
              text_positionx:400,
              text_positiony:100,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Role',
              field_name:'job_position',
              
          },
          id_issue_date:{
              text_positionx:400,
              text_positiony:120,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Issue Date',
              field_name:'id_issue_date',
              
          },
          id_expire_date:{
              text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Expire Date',
              field_name:'id_expire_date',
              
          }
      },
      back:{
          phone_number:{
              text_positionx:400,
              text_positiony:90,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Phone',
              field_name:'phone_number',
              
          },
          address:{
              text_positionx:400,
              text_positiony:120,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Address',
              field_name:'address',
              
          }
      },
      badge:{
          photo:{
            xPosition:30,
            yPosition:80,
            image_width:150,
            image_height:150,
            has_mask:false,
            mask_thickness:0,
            mask_color:'black',
            is_circle:false,
            circle_diameter:0,
            circle_background:null
          },
          en_name:{
              text_positionx:400,
              text_positiony:90,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Name',
              field_name:'en_name',
          },
          job_position:{
              text_positionx:400,
              text_positiony:120,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Role',
              field_name:'position',
          },
      }
          
      });
    const frontRef=useRef();
    const backRef=useRef();
  
  useEffect(()=>{
      if(userProfile&&userProfile.photo){
          const img=new window.Image()
          img.src=userProfile.photo
          img.onload=()=>setImage(img)
      }
      else{
          const fallback=new window.Image()
          fallback.src="https://th.bing.com/th/id/OIP.30Yq02E10j8tn6kKBO1qdQHaHa?rs=1&pid=ImgDetMain"
          fallback.onload=()=>setImage(fallback)
      }
  },[userProfile])

  useEffect(()=>{
      
      const querySearchParams=new URLSearchParams(window.location.search);
      const dataString=querySearchParams.get("data");

      if(dataString){
          
          setId(decodeURIComponent(dataString)); 
      }

  },[]);

  useEffect(()=>{
     if(id){
      dispatch(getProfile({Id:id})).then((data)=>{
          console.log(data)
          const dataitem=data.payload;
          console.log(dataitem);
          if(dataitem){
              setUserProfile(dataitem);
              console.log(dataitem)
          }
          else{
              console.log('no id found');
              setUserProfile(null);
          }
          
      })
  }
  },[dispatch,id,idCards])

  useEffect(() => {
      dispatch(getTemplate()).then((data)=>{
          console.log(data)
          const dataitem=data.payload
          console.log(dataitem)
          if(!Array.isArray(dataitem)&& Object.keys(dataitem).length!=0){
              setTemplates(dataitem);
          }
      });
    }, []);

    

    const handleDownload = () => {
      if(!frontRef.current) return;
      if (frontRef.current) {
        console.log(frontRef.current)
        const uri = frontRef.current.toImage({ mimeType: 'image/png', pixelRatio: 2 });
    
        const link = document.createElement('a');
        link.download = 'id-card.png';
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Stage ref not available");
      }
    };
    
    


  console.log(templates)
  const selectedTemplateFields = templates[selectedTemplate] || {};
  console.log(selectedTemplateFields)
  
  const handleIdChange=(e)=>{
      setExtractData({...extractData,[e.target.name]:e.target.value})
      console.log(extractData);
  }

  const handleCreateId=()=>{

      dispatch(generateId({Id:id,UserInfo:userProfile,FormData:extractData}));
      handleDownload();
      setIsCreateModalOpen(false)
      
  }

  const [backObj,setBackObj]=useState();
  const [backObjBack,setBackObjBack]=useState();
  const [backObjBadge,setBackObjBadge]=useState();
  const [imageMaskColor,setImageMaskColor]=useState('black');
  const [imageCircleDiameter, setImageCircleDiameter] = useState(0);
  const [imageMaskThickness,setImageMaskThickness]=useState(0);
  
  console.log(Object.keys(localStorage));
  const loadImageWithCORS = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous'; 
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };

  useEffect(() => {
    const loadBackground = async () => {
      try {
        const img = localStorage.getItem('templateCardsfront');
        console.log('Loaded base64 from localStorage:', img);

        if (!img) {
          console.warn('No image found in localStorage');
          return;
        }

        const loadedImage = await loadImageWithCORS(img);
        setBackObj(loadedImage); // Set the loaded image
      } catch (error) {
        console.error('Failed to load background image', error);
      }
    };

    loadBackground();
  }, []);
  
  

  useEffect(() => {
    const img = localStorage.getItem('templateCardsback');
    if (!img) return;
  
    const image = new window.Image();
    image.src = img;
  
    image.onload = () => {
      console.log('Image loaded:', image);
      setBackObjBack(image);
    };
  }, [selectedTemplate]);
console.log(backObjBack)


useEffect(()=>{
  const img=localStorage.getItem(`templateCardsbadge`);
  console.log(img);
  const loading=new window.Image();
  loading.src=img;
  console.log(loading);
  setBackObjBadge(loading);
},[selectedTemplate]);




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
                  ID Management
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
                  <li className="breadcrumb-item text-muted">ID Management</li>
                </ul>
              </div>

              {/* Buttons */}
              
            </div>
          </div>

          {/* Page content goes here */}
  <div id="kt_app_content" className="app-content flex-column-fluid">
  <div id="kt_app_content_container" className="app-container container-xxl">
  <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6 d-flex">
    <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">Employee Information</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">Employee ID</a>
    </li>
    
</ul>

<div class="tab-content" id="myTabContent">
<div className="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
  <div className="d-flex justify-content-between align-items-start">
    
    {/* User Info Card */}
    <div className="card card-flush h-md-50 mb-5 mb-xl-10" style={{ width: '50%', margin: '20px auto', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      
      {/* Card Header */}
      <div className="card-header" style={{ backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
        <h5 className="card-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>User Information</h5>
      </div>
      
      {/* Card Body */}
      <div className="card-body pt-4 pb-4" style={{ backgroundColor: '#fff' }}>
        <div className="mb-3">
          {['en_name', 'title', 'date_of_birth', 'joined_date', 'job_title_category', 'salary_id', 'marital_status', 'nation', 
            'job_position_start_date', 'job_position_end_date', 'address', 'house_number', 'region', 'zone', 'woreda', 
            'id_issue_date', 'id_expire_date'].map((field) => (
            <p key={field} style={{ margin: '8px 0', fontSize: '1rem' }}>
              <strong>{field.replace('_', ' ').toUpperCase()}:</strong> <span>{userProfile[field] || "N/A"}</span>
            </p>
          ))}
        </div>
      </div>
    </div>

    
    {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0  && (
      
      <div className="d-flex justify-content-center w-100 mt-5">
        <Stage className="stage" width={700} height={500}>
          <Layer>
            <KonvaImage width={700} height={500} image={backObjBadge} />
            {image && (
              <Image
                x={templates['badge']?.imagePosition?.x || 50}
                y={templates['badge']?.imagePosition?.y || 50}
                image={image}
                width={templates['badge']?.imageDimension?.image_width || 150}
                height={templates['badge']?.imageDimension?.image_height || 150}
                stroke={templates[selectedTemplate]?.photo?.mask_color || 'imageMaskColor'}
                strokeWidth={templates['badge']?.photo?.mask_thickness || 0}
cornerRadius={templates['badge']?.photo?.circle_diameter || 0}

                rotation={0}
             
              />
            )}
            {Object.entries(templates['badge'] || {}).map(([key, field]) => {
              const fieldValue = userProfile?.[field.field_name] ?? "N/A";
              const displayText = Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;
              const xPos = Number(field.text_positionx || 0);
              const yPos = Number(field.text_positiony || 0);

              return (
                <Group key={key}>
                  <Text
                    x={xPos}
                    y={yPos}
                    text={field.field_label}
                    fill={field.text_font_color}
                    fontFamily={field.text_font_type}
                    fontSize={Number(field.text_font_size)}
                    fontStyle="bold"
                  />
                  <Text
                    x={xPos + 200}
                    y={yPos}
                    text={displayText}
                    fill={field.text_font_color}
                    fontFamily={field.text_font_type}
                    fontSize={Number(field.text_font_size)}
                  />
                </Group>
              );
            })}
          </Layer>
        </Stage>
      </div>
    )}
  </div>
</div>

    <div className="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
  <div className="id-show d-flex flex-wrap gap-5 w-100">
    
      <div className="card card-flush h-md-50 mb-5 mb-xl-10 flex-grow-1"  style={{ minWidth: '350px', maxWidth: '48%' }} >
        <div className="card-header"><h2>Front Template</h2></div>

        {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0 && (
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Stage width={700} height={500} ref={frontRef}>
              <Layer>
                <KonvaImage width={700} height={500} image={backObj} />
                {image && (
                  <>
                 <Circle
                         x={templates[selectedTemplate]?.imagePosition?.x + (templates[selectedTemplate]?.imageDimension?.image_width || 150) / 2}
                         y={templates[selectedTemplate]?.imagePosition?.y + (templates[selectedTemplate]?.imageDimension?.image_height || 150) / 2}
                         radius={(templates[selectedTemplate]?.imageDimension?.image_width || 150) / 2}
                         fill="white" 
                       />
                     
                       
                       <Image
                         x={templates[selectedTemplate]?.imagePosition?.x || 50}
                         y={templates[selectedTemplate]?.imagePosition?.y || 50}
                         image={image}
                         width={templates[selectedTemplate]?.imageDimension?.image_width || 150}
                         height={templates[selectedTemplate]?.imageDimension?.image_height || 150}
                         stroke={templates[selectedTemplate]?.imageMaskColor || imageMaskColor}
                         strokeWidth={templates[selectedTemplate]?.imageMaskThickness || imageMaskThickness}
                         cornerRadius={templates[selectedTemplate]?.imageCircleDiameter || imageCircleDiameter}
                         rotation={0}
                       />
                     </>
                )}
                {Object.entries(templates['front'] || {}).map(([key, field]) => {
                  const fieldValue = userProfile?.[field.field_name] ?? "N/A";
                  const displayText = Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;
                  const xPos = Number(field.text_positionx || 0);
                  const yPos = Number(field.text_positiony || 0);

                  return (
                    <Group key={key}>
                      <Text
                        x={xPos}
                        y={yPos}
                        text={field.field_label}
                        fill={field.text_font_color}
                        fontFamily={field.text_font_type}
                        fontSize={Number(field.text_font_size)}
                        fontStyle="bold"
                      />
                      <Text
                        x={xPos + 200}
                        y={yPos}
                        text={displayText}
                        fill={field.text_font_color}
                        fontFamily={field.text_font_type}
                        fontSize={Number(field.text_font_size)}
                      />
                    </Group>
                  );
                })}
              </Layer>
            </Stage>
          </div>
        )}


      </div>
      <div className="card card-flush h-md-50 mb-5 mb-xl-10 flex-grow-1" id="back-id" style={{ minWidth: '350px', maxWidth: '48%' }} >
      <div className="card-header"><h2>Back Template</h2></div>
      {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0 && (
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Stage width={700} height={500} ref={backRef}>
              <Layer>
                <KonvaImage width={700} height={500} image={backObjBack} />
                
                {Object.entries(templates['back'] || {}).map(([key, field]) => {
                  const fieldValue = userProfile?.[field.field_name] ?? "N/A";
                  const displayText = Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;
                  const xPos = Number(field.text_positionx || 0);
                  const yPos = Number(field.text_positiony || 0);

                  return (
                    <Group key={key}>
                      <Text
                        x={xPos}
                        y={yPos}
                        text={field.field_label}
                        fill={field.text_font_color}
                        fontFamily={field.text_font_type}
                        fontSize={Number(field.text_font_size)}
                        fontStyle="bold"
                      />
                      <Text
                        x={xPos + 200}
                        y={yPos}
                        text={displayText}
                        fill={field.text_font_color}
                        fontFamily={field.text_font_type}
                        fontSize={Number(field.text_font_size)}
                      />
                    </Group>
                  );
                })}
              </Layer>
            </Stage>
          </div>
        )}
      </div>
      
      
    
  </div>
  <form style={{ margin: '20px auto', width: '50%' }}>
              <div className="mb-3">
                <label htmlFor="issuedate" className="form-label">Issue Date</label>
                <input
                  type="date"
                  id="issuedate"
                  className="form-control"
                  name="id_issue_date"
                  onChange={handleIdChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiredate" className="form-label">Expire Date</label>
                <input
                  type="date"
                  id="expiredate"
                  className="form-control"
                  name="id_expire_date"
                  onChange={handleIdChange}
                />
              </div>
            </form>

            <button className="btn btn-primary" style={{ width: '150px' }} onClick={handleCreateId}>
              Generate ID
            </button>

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
  );
}
