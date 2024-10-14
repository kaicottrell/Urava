
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext";
function LogoutLink(props: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const { triggerToast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""

        })
            .then((data) => {
                if (data.ok) {
                    navigate("login");
                    triggerToast("You have been successfully logged out.", "success");
                }
                else { }


            })
            .catch((error) => {
                console.error(error);
            })

    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;