import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import PopupMember from "../PopupMember";
import MembersTable from "../MembersTable";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import "./style.css";
import axiosInstance from "../../axiosInstance";

export default function AddMember({ startupId, token }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [members, setMembers] = useState([]);
  const [memberToEdit, setMemberToEdit] = useState(null); // State for the member to edit
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get(`/team-members/${startupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          setMembers(response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [startupId]);

  const handleClickOpen = () => {
    setMemberToEdit(null); // Clear the member to edit when opening popup for new member
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

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

  const handleEditClick = (index) => {
    const member = members[index];
    if (!member) return;

    setMemberToEdit({
      id: member.id,
      fullname: member.fullname,
      position: member.position,
      salary: member.salary,
    }); // Set the member data to edit
    setOpenPopup(true); // Open the popup
  };

  const handleDelete = async (index) => {
    const member = members[index];
    try {
      const response = await axiosInstance.delete(
        `/team-members/${startupId}/${member.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress /> {/* Material-UI loading spinner */}
        </Box>
      ) : (
        <div className="members-container">
          {members.length > 0 ? (
            <>
              <MembersTable
                token={token}
                startupId={startupId}
                members={members}
                handleEdit={handleEditClick} // Pass the handleEditClick function
                handleDelete={handleDelete}
                setMembers={setMembers}
              />
              <Button
                className="btn-add-member"
                startIcon={<AddIcon className="btn-plus" />}
                onClick={handleClickOpen}
              >
                Add Member
              </Button>
            </>
          ) : (
            <div className="member-box">
              <div className="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="member-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  ></path>
                </svg>
              </div>

              <div className="content-block">
                <span className="bar full"></span>
                <span className="bar half"></span>
                <span className="bar full"></span>
                <span className="bar full"></span>
                <span className="bar half"></span>
              </div>

              <Button
                className="btn-add-member"
                startIcon={<AddIcon className="btn-plus" />}
                onClick={handleClickOpen}
              >
                Add Member
              </Button>
            </div>
          )}
          <PopupMember
            open={openPopup}
            handleClose={handleClose}
            handleSave={handleSave}
            memberToEdit={memberToEdit} // Pass memberToEdit to PopupMember
            token={token}
            startupId={startupId}
          />
        </div>
      )}
    </>
  );
}
