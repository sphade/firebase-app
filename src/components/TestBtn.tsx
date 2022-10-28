import { Button, ButtonProps } from "@mui/material";
import React, { FC } from "react";
type IButton= {
  children: any;
  props?: any;
}
const TestBtn: FC<IButton & ButtonProps> = ({ children, ...props }) => {
  return (
    <div>
      <Button {...props}>{children}</Button>
    </div>
  );
};

export default TestBtn;
