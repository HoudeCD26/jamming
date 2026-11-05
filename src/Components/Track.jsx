

function Track({trackInfo,onAddToPlaylist}){
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
            <h2>{trackInfo.song}</h2>
            <div>
                <p>{trackInfo.author}</p>
                <p>{trackInfo.album}</p>
            </div>
        </div>
        <button className="add-button" type="button" onClick={()=>onAddToPlaylist(trackInfo.id)}>+</button>
        </div>
        </>
    )
};

export default Track;
