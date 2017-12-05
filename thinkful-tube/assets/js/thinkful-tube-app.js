function getYoutubeResults(query, callback) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            q: query,
            key: 'AIzaSyCzUbhyLVgRs-NZ3-BjH_SX1qMjnxQopOc',
            part: 'snippet'
        },
        dataType: 'json',
        type: 'GET'
    })
    .done(function(data) {
        callback(data);
    })
    .fail(function() {
        console.log('error running ajax query');
    });
}

function displayResults(searchResults) {
    if (searchResults.items.length) {
        let resultBox;
        $('.js-results').empty();
        searchResults.items.forEach(function (item) {
            // Make sure it's a video
            if (item.id.kind === 'youtube#video') {
                resultBox = `<li class="list-group-item">
                            <img src="${item.snippet.thumbnails.default.url}" alt="YouTube Video Image for ${item.snippet.title}" class="img-fluid mr-3" style="width: 190px;float: left; max-height: 142px;">
                            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" data-lity><h4 style="margin: 0 0 10px;" class="card-title">${item.snippet.title}</h4></a>
                            <p style="margin: 0 0 10px;" class="card-text">${item.snippet.description}</p>
                            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" class="btn btn-primary" data-lity>View Video</a>
                            <small><a class="float-right" href="https://youtube.com/channel/${item.snippet.channelId}" target="_blank">Go to ${item.snippet.channelTitle} YouTube Channel <i class="fa "></i></a></small>
                        </li>`;
                $('.js-results').append(resultBox);
            }
        });

        if (searchResults.nextPageToken) {

        }

    } else {
        console.log('did not get any results');
    }
}

function handleSearchForm() {
    $('#js-search-form').on('submit', function (event) {
        event.preventDefault();
        let searchTerm = $(this).find('input[type=text]').val();
        getYoutubeResults(searchTerm, displayResults);
    });
}

$(handleSearchForm);