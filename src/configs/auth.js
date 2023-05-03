export default {
  /*meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
  */
  meEndpoint: `${process.env.SMART_AUTH_API}/api/auth/user` ,
  loginEndpoint: `${process.env.SMART_AUTH_API}/api/auth/login` ,
  logoutEndpoint: `${process.env.SMART_AUTH_API}/api/auth/logout`,
  registerEndpoint:  `${process.env.SMART_AUTH_API}/api/auth/register`,
  refreshTokenEndpoint:  `${process.env.SMART_AUTH_API}/api/auth/refresh-token`,
  forgotPasswordEndpoint:  `${process.env.SMART_AUTH_API}/api/auth/forgot-password` ,
  changePasswordEndpoint:  `${process.env.SMART_AUTH_API}/api/auth/change-password` ,
  projectEndpoint: 'http://127.0.0.1:8001/api/project',
}
