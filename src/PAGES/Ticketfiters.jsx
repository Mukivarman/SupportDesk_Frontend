import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";
import SideBar from "../components/Sidebar";
import LoadingBar from "../components/Loadings";
import { fetch_Api } from "../js/tools";

export default function TicketFilterPage() {
  const { filter } = useParams();
  const userString = localStorage.getItem("loguser");
  const [user, setUser] = useState(JSON.parse(userString));
  const [accessPage, setAccessPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  const theme=localStorage.getItem('theme')

  const fetchData = async (links) => {
    try {
      setList(null)
      const Data=await fetch_Api(links,'Get',user.jwttoken)
  
      if(Data.Res){
        setList(Data.data);
        setLoading(true);
      
      }else{
        setLoading(true)
        console.log(Data.msg)
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
   
    if (user) {
      const thisPage = user.power;
      checkalreadyclint(user, setAccessPage, navigate, thisPage);
    } else {
      navigate("/Login");
    }


    if (filter) {
      if (user.power === "Admin") {
        const links = `api/filters/${filter}`;
        fetchData(links);
      } else if (user.power === "SupportTeam") {
        const links = `api/SupportTeamclintdetails/${filter}`;
        fetchData(links);
      } else if (user.power === "User") {
        const links = `api/userfilters/${filter}`;
        fetchData(links);
      }
    }
  }, [filter]);

  return accessPage && loading? (
    <section className={theme==='light'?'light':'dark'}>
      <section className="content">
        <section
          className="AllTickets"
          style={user.power !== "User" ? { width: "100%" } : {}}
        >
          <div className="allticketsdetails">

          <h2 style={{textAlign:"center",marginBottom:"5px"}}>{filter} Tickets</h2>
            <table>
              <thead>
                <tr>
                  <th>s.no</th>
                  <th>Created Time</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Assigned User</th>
                  <th>Occured Date</th>
                
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{new Date(item.CreatedAt).toLocaleDateString() + " -- " + new Date(item.CreatedAt).toLocaleTimeString()}</td>

                     
                      <td>{item.Subject}</td>
                      <td>{item.Status}</td>
                      <td>
                        {item.AssignedUser
                          ? item.AssignedUser.username
                          : "Not Assigned"}
                      </td>
                      <td>
                        {new Date(item.OccuredDate).toLocaleDateString()}-
                        {new Date(item.OccuredDate).toLocaleTimeString()}
                      </td>
                      <td>
                        <button
                          style={{ margin: "auto" }}
                          onClick={() =>
                            navigate(`/ViewTicketDetails/${item._id}`)
                          } >
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {list&&list.length==0&&<p style={{textAlign:'center',marginTop:'15%'}}>List Is Empty NO  Data Avail </p>}
    {!list&&
     <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : {  backgroundcolor: "#201f32df"}}        >
           <LoadingBar type='bars' color='black' />
    </div>}
          </div>
        </section>
      </section>
      {user.power === "User" && <SideBar />}
    </section>
  ): <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundcolor: "#201f32df" }}        >
  <LoadingBar type='bars' color='black' />
  </div>
}
