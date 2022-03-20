export const listButton = (pageName, onClick) => (
    <div>
        <div className="menu-icon-color" onClick={() => onClick(pageName)}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageName}</label>
        </div>
    </div>
    
)