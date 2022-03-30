export const InputTemplate = ({thePlaceholder, theValue, setTheValue}) => (
    <div>
        <input className="form-font-size"
        type='text'
        placeholder={thePlaceholder}
        value={theValue}
        onChange={(e) => setTheValue(e.target.value)}
        />
    </div>
)

export const InputDropDownListTemplate = ({thePlaceholder, theValue, setTheValue, allOptions}) => (
    <div className="sameline label-input-spacing">
        <input className="form-font-size " 
        list={thePlaceholder + '-list'}  
        value={theValue}
        placeholder={thePlaceholder}
        onChange={(e) => setTheValue(e.target.value)}/>
        <datalist id={thePlaceholder + '-list'} >
            {allOptions}
        </datalist>

    </div>
)