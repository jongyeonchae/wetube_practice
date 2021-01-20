import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render('home', { pageTitle: 'Home', videos });
    } catch (error) {
        console.log(error);
        res.render('home', { pageTitle: "Home", videos: [] });
    }
};

export const search = async (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    // let 변수: videos 변수는 video가 업로드 된 경우 reassigned 될 것 
    let videos = [];
    try {
        // $regex: 정규표현식으로 searchingBy를 포함한 단어 찾음 
        // $options: "i": 대소문자 구분 없이 찾음(insensitive)
        videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } })
    } catch (error) {
        console.log(error);
    }
    res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) =>
    res.render('upload', { pageTitle: 'Upload' });

// file url 확인 
// export const postUpload = (req, res) => {    
//     const { body, file } = req;
//     console.log(body, file);
//     res.render("upload", { pageTitle: "Upload" });
// };
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        console.log(video);
        res.render('videoDetail', { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
