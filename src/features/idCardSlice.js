import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const getProfile = createAsyncThunk(
    'profile/get',
    async ({ Id }, { rejectWithValue }) => {
      try {
        
        
        let storedProfiles = JSON.parse(localStorage.getItem('profile')) || [];
  
        if (!Array.isArray(storedProfiles)) {
          storedProfiles = [];
        }
        
        let profile = storedProfiles.find((storedProfile) => {
           
          const employmentId = storedProfile.employment_id;
  
        
          if (Array.isArray(employmentId)) {
            return employmentId.map(String).includes(String(Id).trim());
          }
  
          return String(employmentId).toLowerCase().trim() === String(Id).toLowerCase().trim();
        });
  
        console.log('Found profile:', profile);
        console.log(profile)
        return profile ?? {}; 
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message || 'Failed to get profile');
      }
    }
  );
  

export const generateId=createAsyncThunk(
    'id/create',
    async({Id,UserInfo,FormData},{rejectWithValue})=>{
        try{
          let idCardId;
            console.log('trying')
            let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
            if(!Array.isArray(storedProfiles)){
                storedProfiles=[]
            }
            if (storedProfiles.length === 0) {
                let lastIdCardId=0;
                idCardId=lastIdCardId+1;
            } else {
                const lastIdCard = storedProfiles.pop();
                if (lastIdCard && lastIdCard.id) {
                    let lastIdCardId = lastIdCard.id;
                     lastIdCardId=parseInt(lastIdCardId,10);
                      idCardId=lastIdCardId+1;
                      
                } else {
                    let lastIdCardId=0;
                    idCardId=lastIdCardId+1;
                }
                storedProfiles.push(lastIdCard);
            }
            const userIndex=storedProfiles.findIndex((storedProfile)=>{
                return String(storedProfile.employment_id).toLowerCase().trim()===String(Id).toLowerCase().trim()
            })
            console.log(userIndex)
            const updatedProfile={
                ...storedProfiles[userIndex],
                id_expire_date:FormData?.id_expire_date,
                id_issue_date:FormData?.id_issue_date,
                id_status:'Active'
            }
            console.log(updatedProfile);
            const newId={
                id:idCardId,
                en_name:UserInfo?.en_name,
                job_position:UserInfo?.job_position,
                id_expire_date:FormData?.id_expire_date,
                id_issue_date:FormData?.id_issue_date,
                phone_number:UserInfo?.phone_number,
                address:UserInfo?.address,
            }
            console.log(updatedProfile)
            storedProfiles[userIndex]=(updatedProfile);
            console.log(storedProfiles[userIndex])
            console.log(updatedProfile)
            localStorage.setItem('profile',JSON.stringify(storedProfiles))
            const storedIds=JSON.parse(localStorage.getItem('idcard'));
            storedIds.push(newId);
            localStorage.setItem('idcard',JSON.stringify(storedIds));
            console.log(newId);
            console.log(storedProfiles)
            console.log('saved');
            return newId
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const generateIdBunch = createAsyncThunk(
  'id/bunchIssue',
  async ({ selectedUsers, FormData }, { rejectWithValue }) => {
    try {
      console.log(selectedUsers);
      console.log(FormData)

      const issueDate = FormData.id_issue_date;  
      const expireDate = FormData.id_expire_date;  
      console.log(issueDate)

      console.log(FormData.id_issue_date);
      

      
      if (!issueDate || !expireDate) {
        console.log('Issue and Expiry dates are required')
        return rejectWithValue('Issue and Expiry dates are required');
      }
      console.log('ok')
      
      const updatedUsers={
        ...selectedUsers,
        id_issue_date:FormData.id_issue_date,
        id_expire_date:FormData.id_expire_date
      }
      console.log(updatedUsers)
      

      
      const storedIds = JSON.parse(localStorage.getItem('idcard')) || [];  
console.log(storedIds)
      
      storedIds.push(...updatedUsers);  
      console.log(storedIds)

      
      localStorage.setItem('idcard', JSON.stringify(storedIds));
      alert('generation successful')
      
      return updatedUsers;

    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while updating the IDs');
    }
  }
);


export const saveTemplate=createAsyncThunk(
    'template/save',
    async({TemplateData,Enabled},{rejectWithValue})=>{
        try{
          
            console.log('trying');
            localStorage.setItem('templates',JSON.stringify(TemplateData));
            localStorage.setItem('enabledFields',JSON.stringify(Enabled));
            console.log('template saved');
            console.log(TemplateData)
            console.log(Enabled);
            alert('new template saved');
            return TemplateData
        }catch(error){
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
)

export const getTemplate = createAsyncThunk(
    'template/get',
    async (_, { rejectWithValue }) => {
      try {
        
        let storedTemplates = localStorage.getItem('templates');
        
        if (!storedTemplates || storedTemplates.length === 0) {
            storedTemplates = {};
            return storedTemplates;
          }
  
        const templates = JSON.parse(storedTemplates);
        console.log(templates)
  
      
        if (typeof templates !== 'object' || Array.isArray(templates)) {
          return rejectWithValue('Invalid template format in localStorage');
        }
  
        return templates;  
      } catch (error) {
        
        return rejectWithValue(error.message || 'Failed to load templates');
      }
    }
  );



const idSlice=createSlice({
    name:'idSlice',
    initialState:{
        idCards:[],
        id_issue_date:'',
        id_expire_date:'',
        templates:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(generateId.fulfilled,(state,action)=>{
                state.idCards=[...state.idCards,action.payload]
            })
            .addCase(saveTemplate.fulfilled,(state,action)=>{
                state.templates=[...state.templates,action.payload]
            })
            

    }
    
}
)
export default idSlice.reducer