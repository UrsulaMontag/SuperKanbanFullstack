import { useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const onButtonClick = () => navigate("/create")
    return (
        <>
        <button type="button" onClick={onButtonClick}> </button></>
    )
}