async function fetchData(){
    try{
        const data = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
        const finalData = await data.json();
        let videos = finalData.data.data;
        console.log(videos)

        renderVideos(videos);
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", () => filterVideos(videos, searchInput.value));
    }
    catch(e){
        console.log(e);
    }

}

function renderVideos(videos){
    const container = document.getElementById("mainContainer");
    container.innerHTML = "";
    videos.forEach(video => {

        let videoBox = document.createElement("div");
        videoBox.classList = "video-box";
        let snippet = video.items.snippet;

        videoBox.innerHTML = `<a href="https://www.youtube.com/watch?v=${video.items.id}">
        <img src="${video.items.snippet.thumbnails.medium.url}" alt="${video.items.snippet.title}">
        <div id="videoInfo">
        
            <div id="title"><img src="channels4_profile.jpg" class="profile-img" alt="Profile">${video.items.snippet.title}</div>
            <div id="channel">${video.items.snippet.channelTitle}</div>
        </div>
    </a>`

    container.appendChild(videoBox)
    });



}

function filterVideos(videos, searchTerm) {
    const filteredVideos = videos.filter(video =>
        video.items.snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.items.snippet.channelTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredVideos)
    renderVideos(filteredVideos);
}

fetchData();