import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogNavbar from "./navbar";
import { checkalreadyclint } from "../js/tools";
import SideBar from "./Sidebar";

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
      const response = await fetch(links, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.jwttoken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setList(data);
        setLoading(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("1 render");
    if (user) {
      const thisPage = user.power;
      checkalreadyclint(user, setAccessPage, navigate, thisPage);
    } else {
      navigate("/Login");
    }

    console.log("2 render");
    if (filter) {
      if (user.power === "Admin") {
        const links = `/api/filters/${filter}`;
        fetchData(links);
      } else if (user.power === "SupportTeam") {
        const links = `/api/SupportTeamclintdetails/${filter}`;
        fetchData(links);
      } else if (user.power === "User") {
        const links = `/api/userfilters/${filter}`;
        fetchData(links);
      }
    }
  }, [filter, user]);

  return accessPage && loading && (
    <section className={theme==='light'?'light':'dark'}>
      <LogNavbar page={user.power} />
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
                        {item.OccuredTime}
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
          </div>
        </section>
      </section>
      {user.power === "User" && <SideBar />}
    </section>
  );
}