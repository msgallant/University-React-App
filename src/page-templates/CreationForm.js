import { ButtonTemplate } from "./ButtonTemplate"

const CreationForm = ({title, fields, submitButtonText, onSubmit}) => {
    return (
        <form onSubmit={onSubmit} className="plain-border"> 

            <div className="form-spacing">
                <label className="form-title-size">{title} </label>
            </div>
                
            {fields}

            <div>
                <br></br> 
                <ButtonTemplate theText={submitButtonText}></ButtonTemplate>
            </div>
        
                
            
        
        </form>
    )

}

export default CreationForm