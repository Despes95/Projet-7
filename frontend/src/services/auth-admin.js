export default function admin() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user === user.isAdmin.true) {
    return { Authorization: 'Bearer ' + user.token }; 
  } else {
    return {};
  }
}