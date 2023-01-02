export default function authHeader() {
  const user = localStorage.getItem("username");
  if (user) {
    return { role: localStorage.getItem("role") };
  } else {
    return {};
  }
}
