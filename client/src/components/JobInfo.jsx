
import Wrapper from "../assets/wrappers/JobInfo"




const JobInfo = ({icon,text,gamed}) => {
    return (
        <Wrapper>
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
        </Wrapper>
    )
}

export default JobInfo