import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from 'axios';

const UploadF: React.FC | any= ({item}:any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file as RcFile);
    })
    formData.append('_id', item[0]._id);
    setUploading(true);
    // You can use any AJAX library you like


    axios({
      method: "patch",
      url: 'https://arceditz.onrender.com/createWork/u',
      // url: 'http://192.168.233.78:8080/createWork/u',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then( (response) =>{
        setFileList([]);
        message.success('upload successfully.');
        console.log(response);
      })
      .catch((err)=> {
        message.error('jpg, png, jpeg, pdf are allowed ,upload one at a time');
      }).finally(() => {
        setUploading(false);
      });
  };
var o = [];
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      console.log(newFileList)
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      o = o.concat(file)
      setFileList(o);

      return false;
    },
    multiple:true,
    fileList,
  };
console.log("J",o);
  return (
    <>
      <Upload {...props}>
        <Button style={{fontSize:16}} icon={<UploadOutlined />}/>
      </Upload>
     {fileList.length>0?(
       <Button
       type="primary"
       onClick={handleUpload}
       disabled={fileList.length === 0}
       loading={uploading}
       style={{ marginTop: 16 }}
     >
       {uploading ? 'Uploading' : 'Upload'}
     </Button>
     ):null}
    </>
  );
};

export default UploadF;