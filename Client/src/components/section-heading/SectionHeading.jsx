import React from "react";
import PropTypes from "prop-types";

import "./section-heading.scss";

const SectionHeading = (props) => {
    return (
        <div className="section-heading">
            <span>{props.subtitle}</span>
            <h2>{props.title}</h2>
        </div>
    );
};

SectionHeading.propTypes = {
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default SectionHeading;
