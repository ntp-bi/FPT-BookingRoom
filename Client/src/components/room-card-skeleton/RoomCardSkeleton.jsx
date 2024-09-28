import React from "react";
import { Skeleton, Box, Typography } from "@mui/material";
import "./room-card-skeleton.scss";

const RoomCardSkeleton = () => {
    return (
        <Box className="custom-skeleton">
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Box padding={2}>
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="40%" height={25} />
                <Skeleton variant="text" width="100%" height={40} />
            </Box>
        </Box>
    );
};

export default RoomCardSkeleton;
