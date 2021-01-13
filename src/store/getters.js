const getters = {
  token: state => state.user.token,
  roles: state => state.user.accountInfo.role,
  baseRoute: state => state.permission.routes
};
export default getters;
