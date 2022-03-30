const TitleAndTwoColumnsTemplate = ({title, leftFieldTitle, rightFieldTitle}) => {
    return (
        <div>
             <div className="form-title-size">
                <label> {title} </label>
            </div>
            <div className="center-left form-font-size">
                <label>{leftFieldTitle}</label>
            </div>
            <div className="center-right form-font-size">
                <label>{rightFieldTitle}</label>
            </div>
            <br></br>
            <label className="hidden"> &nbsp;</label>

        </div>
    )

}

export default TitleAndTwoColumnsTemplate