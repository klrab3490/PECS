import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import ToCompleteCard from "./ToCompleteCard";

const Admin = () => {
  const { user , pending } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);


  // const pending = await axios.get("/api/admin/collection")


  return (
    <div className="dashboard">
      <div className="hero-section">
      <div className="left-section">
          <div className="title">
            Collection Pending 
          </div>
          <div className="collection-list">
          <div className="collection">
              {pending.map((incomplete, i) =>{
                          return <ToCompleteCard toComplete={incomplete} key={i}/>
        
                        })}
      </div>
          </div>
        </div>
        <div className="right-section">
        <div className="profile">
            <h2>Admin Profile</h2>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.location}</h2>
          </div>
        </div>
      </div>

       

    </div>
  );
};

export default Admin;