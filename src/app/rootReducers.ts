import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
// import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import loginReducer from "./login/login";
import campaignReducer from "./campaign/campaign";
import editorReducer from "./editor/editor";
import donorsReducer from "./donor/donor";

const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  mediaRunning: mediaRunningReducer,
  login: loginReducer,
  campaigns: campaignReducer,
  editor: editorReducer,
  donors: donorsReducer,
};

export default rootReducers;
