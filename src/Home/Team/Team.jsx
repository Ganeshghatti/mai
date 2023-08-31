import React from "react";
import "./Team.scss";
import teamimg from "./team.jpg";
import ganeshimg from "./Ganesh.jpg"
import sudeshimg from "./Sudesh.jpeg"
import adityaimg from "./Aditya.jpeg"

const Team = () => {
  const team = [
    {
      id: 1,
      image: adityaimg,
      name: "Aditya Vaish",
      role: "Prompt engineer",
    },
    {
      id: 2,
      image: ganeshimg,
      name: "Ganesh Ghatti",
      role: "Technical Head",
    },
    {
      id: 3,
      image: sudeshimg,
      name: "Sudesh Hegde",
      role: "Content Writer",
    },
  ];
  return (
    <>
      <section id="team">
        <h1 className="team-title">Team Members</h1>
        <div className="team-members-div">
          {team.map((item) => {
            return (
              <div className="team-box" key={item.id}>
                <div className="team-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <h5>{item.role}</h5>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Team;
