const Header = () => {
    return(
        <>
        <div className="div_header">
            <div className="container header">
                <h2>To read list</h2>
            </div>
            <div className="container hd_buttons">
                <button type="button" className="btn btn-outline-secondary">account</button>
                <button type="button" className="btn btn-outline-secondary">settings</button>
            </div>
        </div>

        <hr id="hr_index"/>
        </>
    );
}

export default Header;