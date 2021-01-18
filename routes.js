// Global 
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN, 
    login: LOGIN,
    logout: LOGOUT, 
    search: SEARCH,
    users: USERS,
    // login 시 로그인한 사용자의 id를 url에 포함시키기 위해 함수 설정 (id가 존재한다면, return ~)
    // express JS는 :id 를 이해하지만 HTML은 이해하지 못하기 때문
    userDetail: (id) => {
        if(id){
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS, 
    upload: UPLOAD,
    videoDetail: (id) => {
        if(id){
            return `/videos/${id}`;
        } else{
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    }, 
    deleteVideo: (id) => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    }
};

export default routes;