import React, { useEffect, useRef } from "react";
import { Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import "./scroll-to-top.scss";

const ScrollToTop = () => {
    const buttonRef = useRef(null);

    const toggleVisibility = () => {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            buttonRef.current.classList.add("active");
        } else {
            buttonRef.current.classList.remove("active");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.addEventListener("scroll", toggleVisibility);
        };
    }, []);

    const handleScrollToTop = () => {
        const scrollToTop =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (scrollToTop > 0) {
            window.requestAnimationFrame(handleScrollToTop);
            window.scrollTo(0, scrollToTop - scrollToTop / 12);
        }
    };

    return (
        <Fab
            ref={buttonRef}
            className="scroll-to-top"
            aria-label="top"
            onClick={handleScrollToTop}
        >
            <ArrowUpwardIcon className="icon"/>
        </Fab>
    );
};

export default ScrollToTop;
