import TitleAndTwoColumnsTemplate from "./TitleAndTwoColumnsTemplate"
const makeEntries= (entries) => {
        return (
            <div>
            {entries.map((entry, index)=>  { return (
            <div key={index} className="select-div-color padding">
                <div>
                    <div className="center-left ">
                        <div>
                            {entry.name}
                        </div>
                    </div>

                    <div className="center-right grade-box">
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
            <TitleAndTwoColumnsTemplate title={title} 
            leftFieldTitle={leftFieldTitle} rightFieldTitle={rightFieldTitle}></TitleAndTwoColumnsTemplate>

            <div className="form-font-size block">
                {makeEntries(entries)}
            </div>
            
            
        </div>
    )
}

export default TranscriptTemplate