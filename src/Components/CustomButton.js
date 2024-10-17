import { Button } from "react-bootstrap";

function CustomButton({ text, variant, size, onClick }) {
    return (<>
        <Button variant={variant} size={size} onClick={onClick}>
            { text }
        </Button>
    </>);
}

export default CustomButton;