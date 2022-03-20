export const personPlusButton = (pageName, onClick) => (
    <div>
        <div className="menu-icon-color" onClick={() => onClick(pageName)}>
            <i className="fas fa-user-plus"></i>
            <label> {pageName}</label>
        </div>
    </div>
    
)