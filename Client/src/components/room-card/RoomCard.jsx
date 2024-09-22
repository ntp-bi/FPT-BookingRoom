import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { configPath } from "../../config/configPath";

import "./room-card.scss";

const RoomCard = (props) => {
    return (
        <div className="room-card">
            <Link to={`${configPath.roomdetail}`}>
                <div className="room-card__image">
                    <img src={props.image} alt="" />
                </div>
                <div className="room-card__body">
                    <div className="room-card__body__title">
                        {props.roomName}
                    </div>
                    <div className="room-card__body__quantity">
                        Số lượng chỗ ngồi: <span>{props.countOfSeats}</span>
                    </div>
                </div>
                <div className="room-card__body__footer">
                    <div className="room-card__body__footer__area">
                        <span>{props.area}m<sup>2</sup></span>
                        <Button variant="contained" className="button">
                            <span>Xem chi tiết</span>
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

RoomCard.propTypes = {
    image: PropTypes.string.isRequired,
    roomName: PropTypes.string.isRequired,
    countOfSeats: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
};

export default RoomCard;
