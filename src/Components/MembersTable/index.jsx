import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "@mui/material";
import axios from "axios";
import PopupMember from "../PopupMember";
import "./style.css"
export default function MembersTable({
  token,
  members,
  startupId,
  setMembers,
}) {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [memberToEdit, setMemberToEdit] = React.useState(null);

  // Open the popup with member details for editing
  const handleEditClick = (index) => {
    const member = members[index];
    if (!member) return;

    setMemberToEdit({
      id: member.id,
      fullname: member.fullname,
      position: member.position,
      salary: member.salary,
    });
    setOpenPopup(true); // Open the popup
  };

  // Delete member by ID
  const handleDeleteClick = async (id) => {
    console.log("id", id);
    console.log("startupId", startupId);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/team-members/${startupId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Filter out the deleted member by ID and update state
      const updatedMembers = members.filter((member) => member.id !== id);
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  // Save new or updated member
  const handleSave = (updatedMember) => {
    console.log("updatedMember", updatedMember);

    // Check if the member already exists (based on id)
    const existingMemberIndex = members.findIndex(
      (member) => member.id === updatedMember.id
    );

    if (existingMemberIndex !== -1) {
      // Update existing member
      const updatedMembers = members.map((member, index) =>
        index === existingMemberIndex ? updatedMember : member
      );
      console.log("updatedMembers", updatedMembers);
      setMembers(updatedMembers);
    } else {
      // Add new member
      setMembers([...members, updatedMember]);
    }

    setOpenPopup(false);
  };

  return (
    <div className="members-table-container">
      <h4 className="mb-4 fs-7">Members</h4>

      <table className="table mt-1 border-0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <tr key={member.id}>
                <td>{member.fullname}</td>
                <td>{member.position || "N/A"}</td>
                <td>{member.salary || "N/A"}</td>
                <td>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditClick(index)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(member.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No members available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <PopupMember
        open={openPopup}
        handleClose={handleClosePopup}
        handleSave={handleSave}
        memberToEdit={memberToEdit}
        token={token}
        startupId={startupId}
      />
    </div>
  );
}
