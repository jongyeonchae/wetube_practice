// arrow function(=>)에는 암묵적으로 return 이 생략되어 있으므로, return을 쓰지 않아도 됨
// export const join = (req, res) => return res.send('Join'); 과 같음
export const join = (req, res) => res.send('Join');
export const login = (req, res) => res.send('Log In');
export const logout = (req, res) => res.send('Log Out');
export const users = (req, res) => res.send('Users');
export const userDetail = (req, res) => res.send('User Detail');
export const editProfile = (req, res) => res.send('Edit Profile');
export const changePassword = (req, res) => res.send('Change Password');
