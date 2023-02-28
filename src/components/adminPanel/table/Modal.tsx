/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {  Modal } from 'antd';
import SearchEmployee from './SearchEmployee';

const Modal1: React.FC | any = ({name,record}:any) => {
  const [open, setOpen] = useState(false);
  console.log("Modalsss",name,record);

  return (
    <>
      <a type="primary" onClick={() => setOpen(true)}>
        {name.name}
      </a>
      <Modal
        title={`Select employee from here for ${name.name}`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        
      >
        <SearchEmployee workName={name} setOpenModal={setOpen} record={record}/>
      </Modal>
    </>
  );
};

export default Modal1;