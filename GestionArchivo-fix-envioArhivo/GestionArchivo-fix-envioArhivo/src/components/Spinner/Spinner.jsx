import "./spinner.scss";

const Spinner = ({size}) => {
    return (
        <div className={size === "big" ? "sk-chase-big" : "sk-chase"}>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
    )
}

export default Spinner;