'use client';

export default function SpotifySong({song}){ 
        //console.log('song;', song)
    if( typeof window !== 'undefined'){
        try{
            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                const element = document.getElementById('embed-iframe');
                const options = {
                    height: 100,
                    width: 300,
                    uri: `spotify:track:${song}`
                    };
                const callback = (EmbedController) => {};
                IFrameAPI.createController(element, options, callback);
            };
        }catch(err){
            console.log('err:', err)
        }
    }

    return(
        <div className={`my-5 flex sm:justify-center spotify-content`}>
             <script src="https://open.spotify.com/embed/iframe-api/v1" />
             <div id="embed-iframe"></div>
        </div>
    )
}
