import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../assets/images/icons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
    onClick={() => {
      navigate(-1);
    }}
    >

<ArrowLeftIcon
      
      className="cursor-pointer border-primary border rounded-full h-10 w-10  "
  
        
        
      />
    </IconButton>
 
  );
};

export default BackButton;
