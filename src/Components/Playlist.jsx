import Track from './Track';
import { useState } from 'react';

function Playlist({playList,handleRemoveFromPlaylist}){

    const [customTitle,setCustomTitle] = useState('');

    return(
        <>
        <div>
            <input placeholder="Enter your Playlist tile"/>
            {
            playList.map(track=>(
                <Track key={track.id} trackInfo={track} handleTrackClick={handleRemoveFromPlaylist} add={false} />
            ))
            }

        </div>
        </>
    )
};

export default Playlist;
