// arrow function(=>)에는 암묵적으로 return 이 생략되어 있으므로, return을 쓰지 않아도 됨
// export const join = (req, res) => return res.send('Join'); 과 같음
export const join = (req, res) => res.render('join', { pageTitle: 'Join' });
export const login = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const logout = (req, res) => res.render('logout', { ageTitle: 'Log Out' });
export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
