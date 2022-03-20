export const plusButton = (pageName, onClick) => (
    <div>
        <div className="menu-icon-color" onClick={() => onClick(pageName)}>
                    <i className="fas fa-plus"></i>
                    <label>{pageName}</label>
        </div>
    </div>
    
)