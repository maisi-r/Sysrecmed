import React from "react";
import style from "./sectionContainer.module.scss";

const SectionContainer = ({ children }) => {
  return (
    <section className={style.container__external}>
      <div className={style.container__internal}>{children}</div>
    </section>
  );
};

export default SectionContainer;
