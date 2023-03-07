import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import {
	DownloadOutlined
  ,DeleteOutlined 
} from '@ant-design/icons';
import UploadF2 from '../Upload2';
import { deleteCompleteFile } from '../../../server/allWork/allWork';
import UploadF from '../Upload';

const Modalf: React.FC | any = ({open,setOpen,title,user,data}) => {
console.log("openen",user);


  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const deleteUpload = async(fileName: any,id: any,role: string)=>{
    try {
      console.log("IIDd",id);
      const deleteUploads = await deleteCompleteFile({_id:id._id,fileName:fileName,role:role}).then((response: any)=>{
        setOpen(!open)
        messageApi.success({
          type:"success",
          content:"file deleted"
         });
      }).catch((err)=>{
        console.log("File not deleted",err.message);
        messageApi.error({
          type:"error",
          content:"file not deleted"
         });
      })
    } catch (error) {
      messageApi.error({
        type:"error",
        content:"file not deleted"
       });
  
    }
  }
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
{contextHolder}
      <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel} width={'60%'}>
     {data === 0?(
       user?.doneWork?.length > 0?(
        user?.doneWork?.map((e)=>{
          // return 	<ButtonNormal onClick={() =>window.open(e, '_blank') }name="Download"/>
          return (
            <>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            {e.match(/\.(jpeg|jpg|gif|png)$/) != null ?<p>image </p>:<p>pdf</p>}
            {e.substring(32,47)}
            <DownloadOutlined size={24}  onClick={() =>window.open(e, '_blank') }/>
            </div>
            {/* <p>{e}</p> */}
            </>
          )
        })
      ):<p>No files</p>
     ):data === 1?(
      user?.file?.map((e)=>{
        // return 	<ButtonNormal onClick={() =>window.open(e, '_blank') }name="Download"/>
        return (
          <>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          {e.match(/\.(jpeg|jpg|gif|png|jpeg)$/) != null ?<p>image </p>:<p>pdf</p>}
          {e.substring(32,47)}
    
          <Button style={{fontSize:16}} onClick={() =>window.open(e, '_blank') } icon={<DownloadOutlined/>}/>

        
          </div>
          {/* <p>{e}</p> */}
          </>
        )
      })
     ):data === 2?(
     <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
      <div>
      <UploadF2 item={user}/>
      </div>
      
    <div>  {user?.doneWork?.map((e)=>{
        return <div style={{display:"flex",marginTop:"1rem"}}>
       
          <div>
          <Button style={{fontSize:14}} onClick={() =>deleteUpload(e,user,'employee') } icon={  <DeleteOutlined style={{color:"black",fontWeight:"bold",fontSize:14}} />}/>

        
          </div>
   
          <div style={{marginLeft:"1rem"}}>{e.substring(55,90)}</div></div>
      })}</div>
     </div>
     ):data === 3 ?(
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
      <div>
      <UploadF item={user}/>
      </div>
      
    <div>  {user?.[0]?.file?.map((e)=>{
        return <div style={{display:"flex",marginTop:"1rem"}}>
       
          <div>
          <Button style={{fontSize:14}} onClick={() =>deleteUpload(e,user?.[0],'admin') } icon={  <DeleteOutlined style={{color:"black",fontWeight:"bold",fontSize:14}} />}/>

        
          </div>
   
          <div style={{marginLeft:"1rem"}}>{e.substring(32,90)}</div></div>
      })}</div>
     </div>
     ):null}
      </Modal>
    </>
  );
};

export default Modalf;