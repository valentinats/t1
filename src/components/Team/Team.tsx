import React from "react";
import { useState } from "react";
import styles from "./Team.module.css";
import teamMember1 from "../../assets/team-member1.png";
import teamMember2 from "../../assets/team-member2.png";
import teamMember3 from "../../assets/team-member3.png";
import teamMember4 from "../../assets/team-member4.png";
import teamMember5 from "../../assets/team-member5.png";
import teamMember6 from "../../assets/team-member6.png";

const Team = () => {
  return (
    <section id="team" className={styles.team}>
      <div className={styles.container}>
        <h2>Our team</h2>
        <ImageGallery />
      </div>
    </section>
  );
};

const ImageGallery = () => {
  return (
    <div className={styles.image__gallery}>
      <div className={styles.column}>
        <ImageItem imagePath={teamMember1} name="Name 1" />
        <ImageItem imagePath={teamMember2} name="Name 2" />
      </div>
      <div className={[styles['column'], styles.middle].join(' ')}>
        <ImageItem imagePath={teamMember3} name="Name 3" />
        <ImageItem imagePath={teamMember4} name="Name 4" />
      </div>
      <div className={styles.column}>
        <ImageItem imagePath={teamMember5} name="Name 5" />
        <ImageItem imagePath={teamMember6} name="Name 6" />
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
      className={styles.team__img}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imagePath} alt="" />
      {isHovered && <div className={styles.overlay}>{name}</div>}
    </div>
  );
};

export default Team;
