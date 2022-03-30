
const makeEntries= (entries) => {
        return (
            <div>
            {entries.map((entry, index)=>  { return (
            <div key={index} className="select-div-color">
                <div>
                    <div className="center-left">
                        <div>
                            {entry.name}
                        </div>
                    </div>

                    <div className="center-right">
                        <div>
                            {entry.grade != null ? entry.grade : 'n/a'}
                        </div>

                    </div>    
                </div>    
                <br></br>
            </div>
        )})}
        </div>
        )
    }

const TranscriptTemplate = ({title, leftFieldTitle, rightFieldTitle, entries}) => {
    return (
        <div className="plain-border">
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
            <div className="form-font-size block">
                {makeEntries(entries)}
            </div>
            
            
        </div>
    )
}

export default TranscriptTemplate