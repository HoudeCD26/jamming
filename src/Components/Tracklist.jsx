// Will receive list of track state and tracklist change handler as props
import Track from './Track';
function Tracklist({trackList,handleAddToPlaylist}){
    return(
        <>
        <div>
            {
            trackList.map(track=>(
                <Track key={track.id} trackInfo={track} onAddToPlaylist={handleAddToPlaylist} />
            ))
            }

        </div>
        </>
    )
};

export default Tracklist;
