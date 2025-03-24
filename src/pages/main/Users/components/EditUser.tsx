import { useLocation } from "react-router-dom";

export default function EditUser() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
  
    const user_id = searchParams.get("id");
    console.log(user_id)

    return (
        <><strong>{user_id}</strong></>
    )
}