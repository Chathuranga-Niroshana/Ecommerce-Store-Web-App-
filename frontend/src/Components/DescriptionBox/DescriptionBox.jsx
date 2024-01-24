import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis dolorem sit ducimus consequuntur, obcaecati quidem dolore! Voluptatibus, labore tenetur, optio ipsum, totam placeat non eaque corrupti nulla neque quis eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur libero ea consectetur in quod excepturi qui officiis voluptate sed, quasi voluptatibus assumenda, error ad, rem vitae dolores molestiae ducimus sunt!</p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsum itaque exercitationem! Illum quasi assumenda, qui at doloremque, aperiam ad nesciunt rerum minima est ullam? Voluptatem a optio corporis doloribus.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
