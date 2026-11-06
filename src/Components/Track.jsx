

function Track({trackInfo,handleTrackClick,add}){
const trackStyle={
    display:"flex",
    justifyContent:"space-between",
    padding:"1rem",
    borderBottom:"1px solid #e5e4e7"
}
const buttonStyle={
    height:"1.2rem",
    margin:"auto 0",
    border:"1px solid #e5e4e7",
    borderRadius:"5px",
    backgroundColor:"#fff"
}


    return(
        <>
        <div  style={trackStyle}>
        <div>
            <h2>{trackInfo.name}</h2>
            <div>
                <p>{trackInfo.artist}</p>
                <p>{trackInfo.album}</p>
            </div>
        </div>
        <button className="add-button" type="button" onClick={()=>handleTrackClick(trackInfo.id)}>{add?"+":"-"}</button>
        </div>
        </>
    )
};

export default Track;
