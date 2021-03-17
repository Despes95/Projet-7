export default function admin() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (user === user.isAdmin.true) {
    return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}