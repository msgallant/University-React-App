const BorderedList = ({itemListTitleName, listItems}) => {
    return (
    <div className="outer-border">
            
            <div className="inner-border">
                <div className="square"></div>
                <div className="square square-right"></div>

                <div className="form-title-size">
                    <label> {itemListTitleName} </label>
                 </div>
                <div className="form-font-size">
                    <label>{listItems}</label>

                </div>

                <label> &nbsp; </label>

                <div className="square bottom-square-position-correction"></div>
                <div className="square square-right bottom-square-position-correction"></div>
            </div>
    </div>
    )
}

export default BorderedList