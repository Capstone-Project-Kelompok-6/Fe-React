import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";

export default function ProtectedRoute() {
	if (Auth.isAuthorization()) {
		return <Navigate to="/dashboard" replace />;
	}
	return <Outlet />;
}
