export default function authHeader() {
  const user = localStorage.getItem("user_name");
  if (user) {
    return { role: localStorage.getItem("role") };
  } else {
    return {};
  }
}
