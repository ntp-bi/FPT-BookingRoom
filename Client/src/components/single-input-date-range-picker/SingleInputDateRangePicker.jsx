import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const SingleInputDateRangePicker = ({ value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["SingleInputDateRangeField"]}>
                <DateRangePicker
                    slots={{ field: SingleInputDateRangeField }}
                    name="allowedRange"
                    value={value}
                    onChange={onChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default SingleInputDateRangePicker;
