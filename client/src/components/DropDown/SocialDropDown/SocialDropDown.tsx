const SocialDropDown = () => {
    return (
    <div className="btn-group">
        <button type="button" id="toggle-btn" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Links
        </button>
        <ul className="dropdown-menu">
            <li><div className="dropdown-item">Action</div></li>
            <li><div className="dropdown-item">Another action</div></li>
            <li><div className="dropdown-item">Something else here</div></li>
        </ul>
    </div>
    )
}

export default SocialDropDown;
