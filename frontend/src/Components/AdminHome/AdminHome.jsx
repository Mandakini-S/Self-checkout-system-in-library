import React, { useState } from "react";
import { person } from "../assets/constant";
import "./AdminHome.css"
import AddModal from "../Modal/AddModal";
import DeleteModal from "../Modal/DeleteModal";
import ScanModal from "../Modal/ScanModal";


const AdminHome = () => {
  const props = { person }
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const openScanModal = () => {
    setShowScanModal(true);
  };

  const closeScanModal = () => {
    setShowScanModal(false);
  };

  return (<>
    <div id="desc_left">
      <h1>Hello, {props.person.name}!</h1>
      <h3>{props.person.email}</h3>
    </div>


    <div className="btn-box">
      <button onClick={openAddModal}>Add a Book</button>
      <button onClick={openDeleteModal}>Delete a Book</button>
      <button onClick={openScanModal}>Scan a Book</button>
    </div>

    <AddModal showModal={showAddModal} closeModal={closeAddModal} />
    <DeleteModal showModal={showDeleteModal} closeModal={closeDeleteModal} />
    <ScanModal showModal={showScanModal} closeModal={closeScanModal} />
  </>)
}

export default AdminHome;