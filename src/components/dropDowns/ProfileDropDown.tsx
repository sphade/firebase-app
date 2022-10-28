import { Popover } from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ArrowRightSmallIcon } from "../../assets/images/icons";
import localforage from "localforage";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useQueryClient } from "react-query";

const ProfileDropDown = ({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: any;
  setAnchorEl: any;
}) => {
  const queryClient = useQueryClient()
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dropDownItem = [
    {
      name: "profile",
      link: "/profile",
    },
    {
      name: "get help",
      link: "/get-help",
    },
    {
      name: "logout",
      link: "/login",
    },
  ];
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      color='error'
      className='rounded-lg !shadow'
      // PaperProps={{ className: "!rounded-lg  !bg-red-500" }}
    >
      <ul className=" bg-whit   w-[205px] py-1 border divide-y flex flex-col">
        {dropDownItem.map(({ name, link }, id) => (
          <Link
            to={link}
            key={id}
            onClick={() => {
              if (name === "logout") {
                queryClient.clear()
                signOut(auth)
              }
            }}
            className={classNames(
              "py-3 capitalize flex items-center justify-between text-sm font-medium text-gray-700 cursor-pointer default-transition hover:bg-gray-100 px-5",
              {
                "!text-primary": name === "logout",
              }
            )}
          >
            {name}
            {name === "logout" ? (
              ""
            ) : (
              <ArrowRightSmallIcon/>
            )}
          </Link>
        ))}
      </ul>
    </Popover>
  );
};

export default ProfileDropDown;
