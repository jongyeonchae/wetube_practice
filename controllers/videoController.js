import {videos} from "../db"
import routes from "../routes"

export const home = (req, res) => {
    res.render('home', { pageTitle: 'Home', videos });
};

export const search = (req, res) => {
    // ES6 이전 코드로 작성 시, 아래와 동일
    // const searchingBy = req.query.term;
    // res.render('search', { pageTitle: 'Search', searchingBy: searchingBy }); 
    const {
        query: { term: searchingBy }
    } = req;    
    res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) => 
    res.render('upload', { pageTitle: 'Upload' });

export const postUpload = (req, res) => {
    const {
        body: { file, title, description } 
    } = req;
    // To Do: Upload and save Video
    res.redirect(routes.videoDetail(324245));
};

export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });

export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });

export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
