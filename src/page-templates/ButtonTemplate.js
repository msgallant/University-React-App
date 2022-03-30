export const ButtonTemplate = ({theText}) => (
    <div>
        <input className="form-font-size form-btn" type='submit' value={theText} />
    </div>

)

export const GenerateEmailButtonTemplate = ({theText, onClickEventFunc}) => (
    <div>
        <button className="form-font-size form-btn generate-email-button" 
            type="button" onClick={onClickEventFunc}> {theText} </button>
    </div>
)

export const GoBackButtonTemplate = ({theText, onClickEventFunc}) => (
    <div>
        <button className="form-font-size form-btn go-back-button" 
            type="button" onClick={() => {
                onClickEventFunc()}}> {theText} </button>
    </div>
)
