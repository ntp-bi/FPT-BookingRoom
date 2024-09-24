import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

import "./section-common.scss";

const SectionCommon = (props) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="section-common">
                    <h1>{props.title}</h1>
                </div>
            </Grid>
        </Grid>
    );
};

SectionCommon.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SectionCommon;
