import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../features/profileSlice";


import { getTemplate} from '../features/idCardSlice'
import { Stage,Layer,Text,Image,Circle,Group,Image as KonvaImage } from "react-konva";

export default function EmployeeDashboard() {
    const dispatch = useDispatch();
    const [backObj,setBackObj]=useState();
    const [backObjBack,setBackObjBack]=useState();
     const [backObjBadge,setBackObjBadge]=useState();
    const [image, setImage] = useState(null);
    const [templates,setTemplates]=useState({
      front:{
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
      
  const [imageMaskThickness,setImageMaskThickness]=useState(0);
const [imageCircleDiameter, setImageCircleDiameter] = useState(0);
const [imageMaskColor,setImageMaskColor]=useState('black');
       const [userProfile,setUserProfile]=useState([]);
       

    const logged = useSelector((state) => state.user.logged);
    const role = useSelector((state) => state.user.role);
    const email=useSelector((state)=>state.user.email);

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
        const img=localStorage.getItem(`templateCardsback`);
        console.log(img);
        const loading=new window.Image();
        loading.src=img;
        console.log(loading);
        setBackObj(loading);
    },[]);

     useEffect(()=>{
        const img=localStorage.getItem(`templateCardsback`);
        console.log(img);
        const loading=new window.Image();
        loading.src=img;
        console.log(loading);
        setBackObjBack(loading);
    },[]);

    useEffect(()=>{
      const img=localStorage.getItem(`templateCardsbadge`);
      console.log(img);
      const loading=new window.Image();
      loading.src=img;
      console.log(loading);
      setBackObjBadge(loading);
  },[]);

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

    

    
    useEffect(() => {
        dispatch(getUserProfile({Email:email})).then((result) => {
            console.log(email)
            if (result.payload) {
              console.log(result.payload)
                setUserProfile((prevData) => ({
                    ...prevData,
                    ...result.payload
                }));
            }
        });
    }, [dispatch]);
    console.log(userProfile)

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
                                    <div className="app-container container-xxl d-flex flex-stack">
                                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                            <h1 className="page-heading text-dark fw-bold fs-3 my-0">
                                                Employee Dashboard
                                            </h1>
                                            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                                                <li className="breadcrumb-item text-muted">
                                                    <a href="/" className="text-muted text-hover-primary">Home</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <span className="bullet bg-gray-400 w-5px h-2px"></span>
                                                </li>
                                                <li className="breadcrumb-item text-muted">Employee Dashboard</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div id="kt_app_content" className="app-content flex-column-fluid">
                                {logged && String(role).toLowerCase() === "employee" ? (
  <div className="app-container container-xxl">
    
    <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="tab-id-tab" data-bs-toggle="tab" data-bs-target="#kt_tab_pane_1" type="button" role="tab" aria-controls="kt_tab_pane_1" aria-selected="true">
          See ID
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="tab-badge-tab" data-bs-toggle="tab" data-bs-target="#kt_tab_pane_2" type="button" role="tab" aria-controls="kt_tab_pane_2" aria-selected="false">
          See Badge
        </button>
      </li>
    </ul>

    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel" aria-labelledby="tab-id-tab">
        {/* ID Content */}
        <div id="emp-id">
            
          <div className="id" >
            <div className="front">
            <Stage width={700} height={500} >
              <Layer>
                <KonvaImage width={700} height={500} image={backObj} />
                {image && (
                  <>
                 <Circle
                         x={templates['front']?.imagePosition?.x + (templates['front']?.imageDimension?.image_width || 150) / 2}
                         y={templates['front']?.imagePosition?.y + (templates['front']?.imageDimension?.image_height || 150) / 2}
                         radius={(templates['front']?.imageDimension?.image_width || 150) / 2}
                         fill="white" 
                       />
                     
                       
                       <Image
                         x={templates['front']?.imagePosition?.x || 50}
                         y={templates['front']?.imagePosition?.y || 50}
                         image={image}
                         width={templates['front']?.imageDimension?.image_width || 150}
                         height={templates['front']?.imageDimension?.image_height || 150}
                         stroke={templates['front']?.imageMaskColor || imageMaskColor}
                         strokeWidth={templates['front']?.imageMaskThickness || imageMaskThickness}
                         cornerRadius={templates['front']?.imageCircleDiameter || imageCircleDiameter}
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
            <div className="back">
              <Stage width={700} height={500} >
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
          </div>
        </div>
      </div>

      <div className="tab-pane fade" id="kt_tab_pane_2" role="tabpanel" aria-labelledby="tab-badge-tab">
        {/* Badge Content */}
        <div id="badges">
          <div className="badge">
            
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
                            stroke={templates['badge']?.photo?.mask_color || mask_color}
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
        </div>
      </div>
    </div>

  </div>):( <h1>Log in as employee</h1>)}
 
</div>

                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    );
}
