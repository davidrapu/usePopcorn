import Button from "./Button";

export default function Box({children, isOpen, setIsOpen}){

    // handling functions
    function handleBoxToggle(){
        setIsOpen((prev) => !prev);
    }
    return (
        <div className="box">
            <Button onClick={handleBoxToggle} className="btn-toggle"> {isOpen ? '-' : '+'} </Button>
            {children}
        </div>
    )
}
