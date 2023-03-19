import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import ToCompleteCard from "./ToCompleteCard";

const Users= () => {
  const { user , completeCollection,incompleteCollection  } = useGlobalContext();
  console.log(incompleteCollection);
  console.log(completeCollection);
  const [materials, setMaterials] = React.useState("");
  const[recyclable,setRecyclable] = React.useState("")
  const[reuseable,setReuseable] = React.useState("")
  const[phonenumber,setPhonenumber] = React.useState("")
  const[address,setAddress] = React.useState("")
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate,completeCollection,incompleteCollection]);


  let data={}

  const onSubmit = (e) => {
    data = {
      materials,
      recyclable,
      reuseable,
      phonenumber,
      address,
      }

      // getdata();
      e.preventDefault();
  
      axios.post("/api/user/collect",data).then((res) => {
        setMaterials("");
        setRecyclable("");
        setReuseable("");
        setPhonenumber("");
        setAddress("");
      }) .catch((err) => {

        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
    };
  



  return (
    <div className="User">
      <div className="hero__section">
        <div className="left__section">
          <div className="user_field">
            <form onSubmit={onSubmit} className='form-user'>
            <label>Enter the type of wastes</label>
            <input className="auth__field"
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                />
                {errors.name && <p className="auth__error">{errors.name}</p>}

              <label>Enter the recyclable material</label>
            <input className="auth__field"
                  type="text"
                  value={recyclable}
                  onChange={(e) => setRecyclable(e.target.value)}
                />
                {errors.name && <p className="auth__error">{errors.name}</p>}

            <label>Enter the reuseable  material</label>
            <input className="auth__field"
                  type="text"
                  value={reuseable}
                  onChange={(e) => setReuseable(e.target.value)}
                />
                {errors.name && <p className="auth__error">{errors.name}</p>}


            <label>Enter the PhoneNumber</label>
            <input className="auth__field"
                  type="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
              />
              {errors.name && <p className="auth__error">{errors.name}</p>}

            <label>Enter the address</label>
            <input className="auth__field"
                  type="text"
                  value={address}
                  onChange={(e) =>setAddress(e.target.value)}
                />
                {errors.name && <p className="auth__error">{errors.address}</p>}

              <button className="btn" type="submit">submit
              </button>

            </form>
          </div>
        </div>
        <div className="right__section">
          <div className="profile">
            <h2>User Profile</h2>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.location}</h2>
          </div>
        </div>

      </div>

        <div className="toComplete">
          <div className="incom-list">
          <p>Users Current Oder Collection List</p>
                {/* <ToDoCard /> */}
                {incompleteCollection.map((incomplete, i) =>{
                  return <ToCompleteCard toComplete={incomplete} key={i}/>
 
                })}
          </div>
          <div className="com-list">
          <p>Completed Collection List</p>    
            {completeCollection.map((incomplete, i) =>{
                  return <ToCompleteCard toComplete={incomplete} key={i}/>
 
                })}
          </div>

         
           
        </div>
        
      
    </div>
  )
}

export default Users;