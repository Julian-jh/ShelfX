import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  // Remove token and redirect
  localStorage.removeItem("token");
  navigate("/login");
  return null;
}
