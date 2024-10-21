import { Button } from "react-bootstrap";

function CustomButton({ text, icon, variant, size, onClick }) {
    return (<>
        <Button variant={variant} size={size} onClick={onClick}>
            <i className={icon}></i>
            <span> </span>
            {text}
        </Button>
    </>);
}

export default CustomButton;