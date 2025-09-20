import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layoute/AuthLayout";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";
import Tweet from "../pages/Tweet";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VideoPage from "../pages/VideoPage";
import CreateTweet from "../pages/CreateTweet";
import EditTweet from "../pages/EditTweet";
import UserProfile from "../pages/UserProfile";
import ChannelList from "../pages/ChannelList";
import SearchPage from "../pages/SearchPage";
import VideoEdit from "../pages/VideoEdit";

export const router = createBrowserRouter([
  // --------- Protected Routes ---------
  {
    path: "/",
    element: <AuthLayout />,   // Protected layout
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> },
      {path: "channel-list/:id/:type", element : <ChannelList/>},
      {path: "channel-list/:id/:type", element : <ChannelList/>},
      {path : "profile/:userId", element: <UserProfile/>},
      
      { path: "upload", element: <Upload /> },
      {path: "edit-video/:id", element: <VideoEdit/>},
      { path: "tweet", element: <Tweet /> },
      { path: "create-tweet", element: <CreateTweet /> },
      { path: "edit-tweet/:id", element: <EditTweet /> },
      
      { path: "/video/:id", element: <VideoPage />},
      { path: "/seach", element : <SearchPage/>}
    ],
  },

  // --------- Public Routes ---------
  {
    path: "/login",
    element: <AuthLayout authentication={false}><Login /></AuthLayout>,
  },
  {
    path: "/signup",
    element: <AuthLayout authentication={false}><Signup /></AuthLayout>,
  },
]);
