import React from "react";
import { useState } from "react";
import "./Team.css";

const Team = () => {
  return (
    <section id="team" className="team">
      <div className="container">
        <h2>Our team</h2>
        <ImageGallery />
      </div>
    </section>
  );
};

const ImageGallery = () => {
  return (
    <div className="image-gallery">
      <div className="column">
        <ImageItem imagePath="./src/assets/team-member1.png" name="Name 1" />
        <ImageItem imagePath="./src/assets/team-member2.png" name="Name 2" />
      </div>
      <div className="column middle">
        <ImageItem imagePath="./src/assets/team-member3.png" name="Name 3" />
        <ImageItem imagePath="./src/assets/team-member4.png" name="Name 4" />
      </div>
      <div className="column">
        <ImageItem imagePath="./src/assets/team-member5.png" name="Name 5" />
        <ImageItem imagePath="./src/assets/team-member6.png" name="Name 6" />
      </div>
    </div>
  );
};

const ImageItem = ({ imagePath, name }: { imagePath: string; name: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="image-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imagePath} alt="" />
      {isHovered && <div className="overlay">{name}</div>}
    </div>
  );
};

export default Team;
