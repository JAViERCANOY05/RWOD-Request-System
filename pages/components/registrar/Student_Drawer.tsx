import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Users from "./Users";
import { useState } from "react";
import Dashboard from "../student/Dashboard";
import Logout from "@mui/icons-material/Logout";
import FeedBack from "../student/FeedBack"
import Request_New from "../student/Request_New";
import List_of_Request from "../student/List_of_Request";
import Profile from "../student/Profile";
import Transaction_History from "../student/Transaction_History";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdWorkHistory } from "react-icons/md";
import FeedbackIcon from '@mui/icons-material/Feedback';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const drawerWidth = 240;

interface display {
  name: string;
  icon: any;
  href: any;
}

const component: display[] = [
  {
    name: "Dashboard",
    icon: <BiSolidDashboard style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Dashboard",
  },

  {
    name: "List of Request",
    icon: <FaListCheck style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "List of Request",
  },
  {
    name: "Profile",
    icon: <CgProfile style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Profile",
  },
  // {
  //   name: "Transaction History",
  //   icon: <MdWorkHistory style={{ fontSize: "1.5em", color: "#1976D2" }} />,
  //   href: "Transaction History",
  // },
  {
    name: "FeedBack",
    icon: <FeedbackIcon style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "FeedBack",
  },

  // Add more trees as needed
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [displayComponent, setDisplayComponent] = useState(<Dashboard />);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const LogOut = () => {
    localStorage.clear();
    router.push("/");
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handlerClick = (item: any) => {
    if (item === "Dashboard") {
      setDisplayComponent(<Dashboard />);
    } else if (item === "List of Request") {
      setDisplayComponent(<List_of_Request />);
    } else if (item === "Profile") {
      setDisplayComponent(<Profile />);
    } else if (item === "Users") {
      setDisplayComponent(<Users />);
    } else if (item === "Transaction History") {
      setDisplayComponent(<Transaction_History />);
    }
    else if (item === "FeedBack") {
      setDisplayComponent(<FeedBack />);
    }
    
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }} className="">
      <CssBaseline/>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className=" flex gap-96">
            <Typography variant="h6" noWrap component="div">
              Registrar Web-based Online Document Request System
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {component.map((text, index) => (
            <ListItem key={index + 1} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <button
                  className="  flex justify-center items-center  "
                  onClick={() => {
                    handlerClick(text.href);
                  }}
                >
                  <ListItemIcon
                    className={
                      open
                        ? "mx-0  text-[#03396C] "
                        : "    hover:text-[#03396C]"
                    }
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 0,
                      justifyContent: "center ",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={open ? "mx-8 " : "mx-0"}
                    primary={text.name}
                    sx={{ opacity: open ? 1 : 0 }}
                    style={{ display: open ? "block" : "none " }}
                  />
                </button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem
          key={0}
          disablePadding
          sx={{ display: "block" }}
          className=" mt-5 "
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <button
              className="  flex justify-center items-center  "
              onClick={handleOpenModal}
            >
              <ListItemIcon
                className={
                  open ? "mx-0  text-[#03396C]" : "   hover:text-[#03396C]"
                }
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 0,
                  justifyContent: "center ",
                }}
              >
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText
                className={open ? "mx-8 " : "mx-0"}
                // primary={"Logout"}
                sx={{ opacity: open ? 1 : 0 }}
                style={{
                  display: open ? "block" : "none ",
                  fontWeight: "bold",
                }}
              >
                Logout
              </ListItemText>
            </button>
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {displayComponent}
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={handleCloseModal}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want Logout ?
                </h3>
                <button
                  onClick={LogOut}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, Im sure
                </button>
                <button
                  onClick={handleCloseModal}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
 
    </Box>
  );
}
