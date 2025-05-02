import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { useState } from "react"
import { useDispatch } from "react-redux";
import { Stage,Layer,Text,Image,Circle,Group,Image as KonvaImage } from "react-konva";



import { saveTemplate,getTemplate} from "../features/idCardSlice";

export default function IdDetails() {
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
  const [image, setImage] = useState(null);
  const backImg=new window.Image();
  backImg.src='https://th.bing.com/th/id/OIP.Rv8GJCOZZhXXpr-MEfSOugAAAA?rs=1&pid=ImgDetMain'
  
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
              circle_background:null,
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
              
          },
          title:{
              text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Title',
              field_name:'title',
          },
          sex:{
              text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Sex',
              field_name:'sex',
          },
          date_of_birth:{
              text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Date of Birth',
              field_name:'date_of_birth',
          },
          joined_date:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Join Date',
              field_name:'joined_date',
          },
          email:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Email',
              field_name:'email',
          },
          phone_number:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Phone',
              field_name:'phone',
          },
          organization_unit:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Unit',
              field_name:'organization_unit',
          },
          job_position:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Position',
              field_name:'job_position',
          },
          job_title_category:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Job Category',
              field_name:'job_title_category',
          },
          salary_id:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Salary ID',
              field_name:'salary_id',
          },
          marital_status:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Marital Status',
              field_name:'marital_status',
          },
          nation:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Nation',
              field_name:'nation',
          },
          employment_id:{
              text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Employment ID',
              field_name:'id_expire_date',
          },
          job_position_start_date:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Position Start Date',
              field_name:'job_position_start_date',
          },
          job_position_end_date:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Position End Date',
              field_name:'job_position_end_date',
          },
          address:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Address',
              field_name:'address',
          },
          house_number:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'House Number',
              field_name:'house_number',
          },
          region:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Region',
              field_name:'region',
          },
          zone:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Zone',
              field_name:'zone',
          },
          woreda:{
            text_positionx:400,
              text_positiony:140,
              text_font_size:18,
              text_font_color:'black',
              text_font_type:'arial',
              field_label:'Woreda',
              field_name:'woreda',
          },
      },
      back:{
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
          circle_background:null,
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
          
      },
      title:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Title',
          field_name:'title',
      },
      sex:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Sex',
          field_name:'sex',
      },
      date_of_birth:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Date of Birth',
          field_name:'date_of_birth',
      },
      joined_date:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Join Date',
          field_name:'joined_date',
      },
      email:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Email',
          field_name:'email',
      },
      phone_number:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Phone',
          field_name:'phone',
      },
      organization_unit:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Unit',
          field_name:'organization_unit',
      },
      job_position:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Position',
          field_name:'job_position',
      },
      job_title_category:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Job Category',
          field_name:'job_title_category',
      },
      salary_id:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Salary ID',
          field_name:'salary_id',
      },
      marital_status:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Marital Status',
          field_name:'marital_status',
      },
      nation:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Nation',
          field_name:'nation',
      },
      employment_id:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Employment ID',
          field_name:'id_expire_date',
      },
      job_position_start_date:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Position Start Date',
          field_name:'job_position_start_date',
      },
      job_position_end_date:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Position End Date',
          field_name:'job_position_end_date',
      },
      address:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Address',
          field_name:'address',
      },
      house_number:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'House Number',
          field_name:'house_number',
      },
      region:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Region',
          field_name:'region',
      },
      zone:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Zone',
          field_name:'zone',
      },
      woreda:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Woreda',
          field_name:'woreda',
      },
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
          circle_background:null,
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
          
      },
      title:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Title',
          field_name:'title',
      },
      sex:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Sex',
          field_name:'sex',
      },
      date_of_birth:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Date of Birth',
          field_name:'date_of_birth',
      },
      joined_date:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Join Date',
          field_name:'joined_date',
      },
      email:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Email',
          field_name:'email',
      },
      phone_number:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Phone',
          field_name:'phone',
      },
      organization_unit:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Unit',
          field_name:'organization_unit',
      },
      job_position:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Position',
          field_name:'job_position',
      },
      job_title_category:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Job Category',
          field_name:'job_title_category',
      },
      salary_id:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Salary ID',
          field_name:'salary_id',
      },
      marital_status:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Marital Status',
          field_name:'marital_status',
      },
      nation:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Nation',
          field_name:'nation',
      },
      employment_id:{
          text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Employment ID',
          field_name:'id_expire_date',
      },
      job_position_start_date:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Position Start Date',
          field_name:'job_position_start_date',
      },
      job_position_end_date:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Position End Date',
          field_name:'job_position_end_date',
      },
      address:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Address',
          field_name:'address',
      },
      house_number:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'House Number',
          field_name:'house_number',
      },
      region:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Region',
          field_name:'region',
      },
      zone:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Zone',
          field_name:'zone',
      },
      woreda:{
        text_positionx:400,
          text_positiony:140,
          text_font_size:18,
          text_font_color:'black',
          text_font_type:'arial',
          field_label:'Woreda',
          field_name:'woreda',
      },
      }
          
      });
      

  const [sampleProfile,setSampleProfile]=useState({
    en_name:'John Doe',
    job_position:'HR',
    phone_number:231233442,
    address:'NY,USA'
  })

  const loadFieldState=()=>{
    const savedFieldState=JSON.parse(localStorage.getItem('enabledFields'));
    return savedFieldState?savedFieldState :{
                en_name:false,
                title:false,
                sex:false,
                date_of_birth:false,
                joined_date:false,
                email:false,
                photo:false,
                phone_number:false,
                organization_unit:false,
                job_position:false,
                job_title_category:false,
                salary_id:false,
                marital_status:false,
                nation:false,
                employment_id:false,
                job_position_start_date:false,
                job_position_end_date:false,
                address:false,
                house_number:false,
                region:false,
                zone:false,
                woreda:false,
                status:false,
                id_issue_date:false,
                id_expire_date:false,
                id_status:false
    }
  }
  const [enableField,setEnableField]=useState(loadFieldState);
  const [isViewModalOpen,setIsViewModalOpen]=useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageDimension,setImageDimension]=useState({width:150,height:150});
  const [imageMask,setImageMask]=useState(false);
  const [imageMaskThickness,setImageMaskThickness]=useState(0);
  const [imageCircle, setImageCircle] = useState({ is_circle: false });
const [imageCircleDiameter, setImageCircleDiameter] = useState(0);
const [imageMaskColor,setImageMaskColor]=useState('black');
  const [imageCircleBackground,setImageCircleBackground]=useState();
  const [isUpdating,setIsUpdating]=useState(false);
  const [selectedTemplate,setSelectedTemplate]=useState("front");
 
  useEffect(()=>{
      const img=new window.Image();
      img.src="https://th.bing.com/th/id/OIP.30Yq02E10j8tn6kKBO1qdQHaHa?rs=1&pid=ImgDetMain";
      img.onload=()=>setImage(img);
      
      
  },[]);

      useEffect(() => {
          dispatch(getTemplate()).then((data)=>{
              const dataitem=data.payload
              console.log(dataitem)
              if(!Array.isArray(dataitem)&& Object.keys(dataitem).length!=0){
                  setTemplates(dataitem);
                  console.log(templates)
              }
              
              
          });
        }, []);
    
  
      const selectedTemplateFields = templates[selectedTemplate] || {};
      const [backObj,setBackObj]=useState();
  
      const handleTemplateImageUpload = (e) => {
          const file = e.target.files[0];
        
          if (file) {
            const reader = new FileReader();
        
            reader.onloadend = () => {
              const imgData = reader.result;
        
              const konvaImg = new window.Image();
              konvaImg.src = imgData;
        
              konvaImg.onload = () => {
                localStorage.setItem(`templateCards${selectedTemplate}`, imgData);
        
                setTemplates((prevTemplates) => {
                  const updatedTemplate = { ...prevTemplates[selectedTemplate] };
                  updatedTemplate.templateBackground = {
                    ...updatedTemplate.templateBackground,
                    image: konvaImg, 
                  };
        
                  return {
                    ...prevTemplates,
                    [selectedTemplate]: updatedTemplate,
                  };
                });
        
                setBackObj(konvaImg); 
              };
            };
        
            reader.readAsDataURL(file);
          }
        };
        
      useEffect(()=>{
          const img=localStorage.getItem(`templateCards${selectedTemplate}`);
          console.log(img);
          const loading=new window.Image();
          loading.src=img;
          setBackObj(loading);
          setImageDimension({
              width: templates[selectedTemplate]?.image_width || 150,
              height: templates[selectedTemplate]?.image_height || 150,
            });
      },[selectedTemplate])

      const handleEnableField=(e)=>{
     
        const selectedField=e.target.previousSibling.value;

        setEnableField((prev)=>({
          ...prev,
          [selectedTemplate]:{
            ...(prev[selectedTemplate]||{}),
            [selectedField]:true
          }
        }));

        

      }
      console.log(enableField)

      const handleDisableField=(key)=>{
        console.log('deselecting');
       

        setEnableField((prev)=>({
          ...prev,
          [selectedTemplate]:{
            ...(prev[selectedTemplate]||{}),
            [key]:false
          }
        }));
      }

  
      const handleTemplateChange = (e, fieldKey) => {
          const { name, value } = e.target;
          setTemplates(prevTemplates => {
              const selectedTemplateCopy = { ...prevTemplates[selectedTemplate] };
              if (selectedTemplateCopy[fieldKey]) {
                  selectedTemplateCopy[fieldKey] = { ...selectedTemplateCopy[fieldKey], [name]: value };
              } else {
                  console.warn(`Field ${fieldKey} not found in template ${selectedTemplate}`);
              }
              return { ...prevTemplates, [selectedTemplate]: selectedTemplateCopy };
          });
      };

      const handleDimensionChange = (e) => {
          const { name, value } = e.target;
          const numericValue = parseInt(value, 10);
        
          setImageDimension((prev) => ({
            ...prev,
            [name]: numericValue, 
          }));
        
          setTemplates((prevTemplates) => ({
            ...prevTemplates,
            [selectedTemplate]: {
              ...prevTemplates[selectedTemplate],
              imageDimension: {
                ...(prevTemplates[selectedTemplate]?.imageDimension || {
                  image_width: 150,
                  image_height: 150,
                }),
                [name]: numericValue, 
              },
            },
          }));
        };
        
  
      const handlePositionChange = (e) => {
          const { name, value } = e.target;
          setImagePosition((prevPosition) => ({
              ...prevPosition,
              [name]: parseInt(value, 10), 
          }));

          setTemplates((prevTemplates) => ({
              ...prevTemplates,
              [selectedTemplate]: {
                  ...prevTemplates[selectedTemplate],
                  imagePosition: {
                      ...(prevTemplates[selectedTemplate]?.imagePosition || { x: 50, y: 50 }), 
                      [name]: parseInt(value, 10),
                  },
              },
          }));
          
      };

      const handleMask=(e,maskVal)=>{
        setImageMask((prevMask) => ({
          ...prevMask,
          has_mask: maskVal,
        }));
      
        setTemplates((prevTemplates) => ({
          ...prevTemplates,
          [selectedTemplate]: {
            ...prevTemplates[selectedTemplate],
            photo: {
              ...(prevTemplates[selectedTemplate]?.photo || {}),
              has_mask: maskVal,
            },
          },
        }));
      }

      const handleMaskThickness=(e)=>{
        const { value } = e.target;
      
        
        setImageMaskThickness(Number(value));
      
        setTemplates((prevTemplates) => ({
          ...prevTemplates,
          [selectedTemplate]: {
            ...prevTemplates[selectedTemplate],
            imageMaskThickness: Number(value), 
          },
        }));
      }

      const handleCircle = (e, maskVal) => {
        setImageCircle((prevMask) => ({
          ...prevMask,
          is_circle: maskVal,
        }));
      
        setTemplates((prevTemplates) => ({
          ...prevTemplates,
          [selectedTemplate]: {
            ...prevTemplates[selectedTemplate],
            photo: {
              ...(prevTemplates[selectedTemplate]?.photo || {}),
              is_circle: maskVal,
            },
          },
        }));
      };
      
      
      const handleCircleDiameter = (e) => {
        const { value } = e.target;
      
     
        setImageCircleDiameter(Number(value));
      
        setTemplates((prevTemplates) => ({
          ...prevTemplates,
          [selectedTemplate]: {
            ...prevTemplates[selectedTemplate],
            imageCircleDiameter: Number(value), 
          },
        }));
      };

      const handleBackgroundUpload=()=>{
        const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img); 
      };
    };

    reader.readAsDataURL(file);
      }

      const handleMaskColor=(e)=>{
        const {value}=e.target;
        setImageMaskColor(value)
      
        setTemplates((prevTemplates) => ({
          ...prevTemplates,
          [selectedTemplate]: {
            ...prevTemplates[selectedTemplate],
            imageMaskColor: value, 
          },
        }));
      
      }

      const handleSaveTemplate=(templates)=>{
          console.log('saved');
          dispatch(saveTemplate({TemplateData:templates,Enabled:enableField}));
      }

      const handleViewTemplate=(id)=>{
        setSelectedTemplate(id);
      }

     

     

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
                  ID Details
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
                  <li className="breadcrumb-item text-muted">ID Details</li>
                </ul>
              </div>

              
              
            </div>
          </div>

          {/* Page content goes here */}
          <div className="page-flexed">
            <div className="template">
            <select className='select-pag' value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                            <option value="front">Front</option>
                            <option value="back">Back</option>
                            <option value="badge">Badge</option>
          </select>
          {selectedTemplateFields && Object.entries(selectedTemplateFields).length > 0 && (
                                <Stage className="stage"width={700} height={600}>
                                    <Layer>
                                        <KonvaImage
                                           image={backObj|| backImg}
                                           width={700}
                                            height={600}
                                            
                                        />
                                        {image &&enableField[selectedTemplate]?.['photo']&& (
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
                                        {Object.entries(selectedTemplateFields).filter(([key,field])=>enableField[selectedTemplate]?.[key]).map(([key, field]) => {
                                          
                                            
                                            const fieldValue = sampleProfile?.[field.field_name];
                                            const displayText = Array.isArray(fieldValue)
                                                ? fieldValue[0]
                                                : (fieldValue || "N/A");
                            
                                            const xPos = field.text_positionx ? Number(field.text_positionx) : 0;
                                            const yPos = field.text_positiony ? Number(field.text_positiony) : 0;
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
                                                    )}
                                        </div>
                                          <div className="template-settings">
                                          <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                                  <li className="nav-item">
                                      <a className="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_4">Template</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_5">Edit Details</a>
                                  </li>
                                  
                              </ul>

                              <div className="tab-content" id="myTabContent">
                                  <div className="tab-pane fade show active" id="kt_tab_pane_4" role="tabpanel">
                                    <div className="table-responsive">
                                    <table className="table table-striped table-rounded">
                                                   <thead>
                                                       <tr>
                                                           <td>#</td>
                                                           <td>Template Type</td>
                                                           <td>File</td>
                                                           <td>Actions</td>
                                                       </tr>
                                                       
                                                   </thead>
                                                   <tbody>
                                                       <tr>
                                                           <td>1</td>
                                                           <td>Front Template</td>
                                                           <td>
                                  <i
                                    className="bi bi-eye-fill"
                                    onClick={() => {
                                      setIsViewModalOpen(true);
                                      handleViewTemplate('front');
                                    }}
                                  ></i>
                                </td>

                                <div
                                  className={`modal fade ${isViewModalOpen ? 'show' : ''}`}
                                  tabIndex="-1"
                                  id="kt_modal_1"
                                  style={{ display: isViewModalOpen ? 'block' : 'none' }}
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-body">
                                        {backObj && (
                                          <Stage width={300} height={200}>
                                            <Layer>
                                              <Image image={backObj} />
                                          </Layer>
                                        </Stage>
                                      )}
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setIsViewModalOpen(false)}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                                                           <td>
                                                               <label htmlFor="template-front">
                                                               <i className="bi bi-pencil-fill"></i>
                                                               </label>
                                                               <input
                                                                   type="file"
                                                                   accept="image/*"
                                                                   onChange={(e) => handleTemplateImageUpload(e)}
                                                                   style={{ display: 'none' }}
                                                                   id="template-front"
                                                               />
                                                               <label><i className="bi bi-trash-fill" onClick={()=>setBackObj(null)}></i></label>
                                                           </td>
                                                       </tr>
                                                       <tr>
                                                           <td>2</td>
                                                           <td>Back Template</td>
                                                           <td>
                                                      <i
                                                        className="bi bi-eye-fill"
                                                        onClick={() => {
                                                          setIsViewModalOpen(true);
                                                          handleViewTemplate('back');
                                                        }}
                                                      ></i>
                                                    </td>

                                                    <div
                                                      className={`modal fade ${isViewModalOpen ? 'show' : ''}`}
                                                      tabIndex="-1"
                                                      id="kt_modal_1"
                                                      style={{ display: isViewModalOpen ? 'block' : 'none' }}
                                                    >
                                                      <div className="modal-dialog">
                                                        <div className="modal-content">
                                                          <div className="modal-body">
                                                            {backObj && (
                                                              <Stage width={300} height={200}>
                                                                <Layer>
                                                                  <Image image={backObj} />
                                                                </Layer>
                                                              </Stage>
                                                            )}
                                                          </div>
                                                          <div className="modal-footer">
                                                            <button
                                                              type="button"
                                                              className="btn btn-light"
                                                              onClick={() => setIsViewModalOpen(false)}
                                                            >
                                                              Close
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                           <td>
                                                           <label htmlFor="template-back">
                                                               <i className="bi bi-pencil-fill"></i>
                                                               </label>
                                                               <input
                                                                   type="file"
                                                                   accept="image/*"
                                                                   onChange={(e) => handleTemplateImageUpload(e,)}
                                                                   style={{ display: 'none' }}
                                                                   id="template-back"
                                                               />
                                                               <label><i className="bi bi-trash-fill" onClick={()=>setBackObj(null)}></i></label>
                                                           </td>
                                                       </tr>
                                                       <tr>
                                                           <td>3</td>
                                                           <td>Badge Template</td>
                                                           <td>
                                                          <i
                                                            className="bi bi-eye-fill"
                                                            onClick={() => {
                                                              setIsViewModalOpen(true);
                                                              handleViewTemplate('badge');
                                                            }}
                                                          ></i>
                                                        </td>

                                                        <div
                                                          className={`modal fade ${isViewModalOpen ? 'show' : ''}`}
                                                          tabIndex="-1"
                                                          id="kt_modal_1"
                                                          style={{ display: isViewModalOpen ? 'block' : 'none' }}
                                                        >
                                                          <div className="modal-dialog">
                                                            <div className="modal-content">
                                                              <div className="modal-body">
                                                                {backObj && (
                                                                  <Stage width={300} height={200}>
                                                                    <Layer>
                                                                      <Image image={backObj} />
                                                                    </Layer>
                                                                  </Stage>
                                                                )}
                                                              </div>
                                                              <div className="modal-footer">
                                                                <button
                                                                  type="button"
                                                                  className="btn btn-light"
                                                                  onClick={() => setIsViewModalOpen(false)}
                                                                >
                                                                  Close
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>

                                                           <td>
                                                           <label htmlFor="template-badge">
                                                               <i className="bi bi-pencil-fill"></i>
                                                               </label>
                                                               <input
                                                                   type="file"
                                                                   accept="image/*"
                                                                   onChange={(e) => handleTemplateImageUpload(e)}
                                                                   style={{ display: 'none' }}
                                                                   id="template-badge"
                                                               />
                                                               <label><i className="bi bi-trash-fill" onClick={()=>setBackObj(null)}></i></label>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <button className="btn btn-primary" onClick={()=>handleSaveTemplate(templates)}>Save Template</button>
                                        </div>
                                        
                                      </div>
                                      <div className="tab-pane fade" id="kt_tab_pane_5" role="tabpanel">
                                      <label>Choose fields to include</label>
                                      <select>
                                        <option value="photo" name="photo">Image</option>
                                        <option value="en_name" name="en_name">Name</option>
                                        <option value="job_position" name="job_position">Role</option>
                                        <option value="id_issue_date" name="id_issue_date">Issue Date</option>
                                        <option value="id_expire_date" name="id_expire_date">Expiry Date</option>
                                        <option value="phone_number" name="phone_number">Phone Number</option>
                                        <option value="email" name="email">Email Address</option>
                                        <option value="address" name="address">Address</option>
                                        <option value="sex" name="sex">Sex</option>
                                        <option value="title" name="title">Title</option>
                                        <option value="date_of_birth" name="date_of_birth">Date of Birth</option>
                                        <option value="joined_date" name="joined_date">Joined Date</option>
                                        <option value="job_title_category" name="job_title_category">Job Title Category</option>
                                        <option value="nation" name="nation">Nation</option>
                                        <option value="region" name="region">Region</option>
                                        <option value="zone" name="zone">Zone</option>
                                        <option value="woreda" name="woreda">Woreda</option>
                                        <option value="house_number" name="house_number">House Number</option>
                                        <option value="marital_status" name="marital_status">Marital Status</option>
                                        <option value="salary_id" name="salary_id">Salary ID</option>
                                        <option value="job_position_start_date" name="job_position_start_date">Job Position Start Date</option>
                                        <option value="job_position_end_date" name="job_position_end_date">Job Position End Date</option>
                                        <option value="employment_id" name="employment_id">Employment ID</option>
                                        <option value="organization_unit" name="organization_unit">Organization Unit</option>
                                        <option value="motto" name="motto">Motto</option>
                                        <option value="mission" name="mission">Mission</option>
                                        <option value="vision" name="vision">Vision</option>
                                        <option value="core_value" name="core_value">Core Value</option>
                                        <option value="logo" name="logo">Logo</option>
                                        <option value="address" name="address">Address</option>
                                        <option value="website" name="website">Website</option>
                                        <option value="phone_number" name="phone_number">Phone number</option>
                                        <option value="fax_number" name="fax_number">Fax number</option>
                                        <option value="po_box" name="po_box">P.O.Box</option>
                                        <option value="tin_number" name="tin_number">Tin Number</option>
                                        <option value="abbreviation" name="abbreviation">Abbreviation</option>

                                      </select>
                                    <button onClick={(e)=>handleEnableField(e)}>Add Field</button>
                                        {enableField[selectedTemplate]?.['photo']&&(<Group className="controls">
                                                                              
                                                                              <Group>
                                                                              <details className="collapsable">
                                                                              <summary className="field" style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                                        <i className="bi bi-x-lg" onClick={(e) => handleDisableField(key)} style={{ marginRight: '8px' }}></i>
                                         Image
                                        </summary>
                                  
                                                                                     
                                                                                      <div className="nested-fields">
                                                                                      
                                                                                      
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Image X Position</summary>
                                                                                          <input 
                                                                                          type="number"
                                                                                          name="x"
                                                                                          onChange={handlePositionChange} 
                                                                                          
                                                                                          placeholder="x-axis"
                                                                                          
                                                                                          />
                                                                                      </details>
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Image Y Position</summary>
                                                                                          <input
                                                                                          type="number"
                                                                                          name="y"
                                                                                          onChange={handlePositionChange} 
                                                                                          
                                  
                                                                                          />
                                                                                      </details>
                                                                                      
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Image Width</summary>
                                                                                          <input
                                                                                          type="number"
                                                                                          name="image_width"
                                                                                          onChange={handleDimensionChange} 
                                                                                          
                                                                                          placeholder="width"
                                                                                          />
                                                                                      </details>
                                  
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Image Height</summary>
                                                                                          <input
                                                                                          type="number"
                                                                                          name="image_height"
                                                                                          onChange={handleDimensionChange} 
                                                                                          
                                                                                          placeholder="height"
                                                                                          />
                                                                                      </details>
                                  
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Mask</summary>
                                                                                          <label>
                                                                                              <input
                                                                                                  type="radio"
                                                                                                  name="has_mask"
                                                                                                  
                                                                                                  onChange={(e)=>handleMask(e,true)}
                                                                                              />
                                                                                              Apply
                                                                                              </label>
                                  
                                                                                              <label style={{ marginLeft: '1rem' }}>
                                                                                              <input
                                                                                                  type="radio"
                                                                                                  name="has_mask"
                                                                                                  
                                                                                                  onChange={(e)=>handleMask(e,false)}
                                                                                              />
                                                                                              Disable
                                                                                              </label>
                                  
                                                                                      </details>
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Mask thickness</summary>
                                                                                          <input
                                                                                          type="number"
                                                                                          name="mask_thickness"
                                                                                          onChange={handleMaskThickness}
                                                                                         
                                                                                          disabled={ !templates[selectedTemplate]?.photo?.has_mask}
                                                                                         
                                                                                          />
                                                                                      </details>
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Mask color</summary>
                                                                                          <input
                                                                                          type="color"
                                                                                          name="mask_color"
                                                                                          onChange={handleMaskColor}
                                                                                          disabled={ !templates[selectedTemplate]?.photo?.has_mask}
                                                                                         
                                                                                          />
                                                                                      </details>
                                  
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Circle</summary>
                                                                                          <label>
                                                                                              <input
                                                                                                  type="radio"
                                                                                                  name="is_circle"
                                                                                                 
                                                                                                  onChange={(e)=>handleCircle(e,true)}
                                                                                              />
                                                                                              Apply
                                                                                              </label>
                                  
                                                                                              <label style={{ marginLeft: '1rem' }}>
                                                                                              <input
                                                                                                  type="radio"
                                                                                                  name="is_circle"
                                                                                                 
                                                                                                  onChange={(e)=>handleCircle(e,false)}
                                                                                              />
                                                                                              Disable
                                                                                              </label>
                                  
                                                                                      </details>
                                                                                      <details className="collapsable">
                                                                                    <summary className="field">Circle Diameter</summary>
                                                                                    <input
                                                                                      type="number"
                                                                                      name="circle_diameter"
                                                                                      onChange={handleCircleDiameter}
                                                                                      disabled={!templates[selectedTemplate]?.photo?.is_circle}
                                                                                      />
                                                                                  </details>
                                                                                      <details className="collapsable">
                                                                                          <summary className="field">Circle Background</summary>
                                                                                          <input
                                                                                          type="file"
                                                                                          name="circle_background"
                                                                                          onChange={handleBackgroundUpload}
                                                                                          disabled={ !templates[selectedTemplate]?.photo?.is_circle}
                                                                                         
                                                                                          />
                                                                                      </details>
                                                                                      </div>
                                                                                  </details>
                                  
                                                                                  
                                                                              </Group>
                                                                              
                                                                          </Group>)}
                                    <div className="temp-settings">
                                    {Object.entries(templates[selectedTemplate]).filter(([key, field]) =>
                                      enableField[selectedTemplate]?.[key]&&field?.field_label?.trim() !== "" && field?.text_positionx != null
                                          ).map(([key, field]) => (
                                    <div key={key}>
                                        <details className="collapsable">
                                        
                                        <summary className="field" style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                                        <i className="bi bi-x-lg" onClick={(e) => handleDisableField(key)} style={{ marginRight: '8px' }}></i>
                                         {field.field_label}
                                        </summary>
                                            <input
                                            type="number"
                                            name="text_positionx"
                                            value={field.text_positionx}
                                            onChange={(e) => handleTemplateChange(e, key)}  
                                            
                                        />
                                        <input
                                            type="number"
                                            name="text_positiony"
                                            value={field.text_positiony}
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            
                                        />
                                        <input
                                            type="number"
                                            name="text_font_size"
                                            value={field.text_font_size}
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            
                                        />
                                        <input 
                                            type="text"
                                            name="field_label"
                                            value={field.field_label}
                                            onChange={(e)=>handleTemplateChange(e,key)}/>
                                        <input
                                            type="color"
                                            name="text_font_color"
                                            value={field.text_font_color}
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            
                                        />
                                        <select
                                            name="text_font_type"
                                            value={field.text_font_type}
                                            onChange={(e) => handleTemplateChange(e, key)}
                                            
                                        >
                                            <option value="arial">Arial</option>
                                            <option value="calibri">Calibri</option>
                                            <option value="gothic">Gothic</option>
                                        </select>
                                        </details>
                                        
                                        
                                    </div>
                                ))}
                                <button className="btn btn-primary" onClick={()=>handleSaveTemplate(templates)}>Update</button>

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
  );
}
