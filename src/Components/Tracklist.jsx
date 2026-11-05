// Will receive list of track state and tracklist change handler as props
import Track from './Track';
function Tracklist({trackList,handleClickButton,add}){
    return(
        <>
        <div>
            {
            trackList.map(track=>(
                <Track key={track.id} trackInfo={track} handleTrackClick={handleClickButton} add={add} />
            ))
            }

        </div>
        </>
    )
};

export default Tracklist;
