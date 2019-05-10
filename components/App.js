App = React.createClass({
// The App download gif,so it needs information about what phrase to search,so we need 'searchingText' key that we must receive from the 'Search' component
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    // The algorithm for this method is as follows:
        // 1.Download the entered text at the entrance.
        // 2.Signalize that the charging process begun.
        // 3. Start download gif.
        // 4.After download:
            //a) stop signaling charging,
            //b) set a new gif from the download result,
            //c) set a new state for the search text.

    handleSearch: function (searchingText) { // 1.
        this.setState({
            loading: true // 2.
        });
        // this.getGif().bind(this) is for keeping the context.
        this.getGif(searchingText, function (gif) { // 3.
            this.setState({ // 4
                loading: false, // a
                gif: gif, // b
                searchingText: searchingText // c
            });
        }.bind(this));
    },

    getGif: function (searchingText, callback) { // 1.
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; // 2.
        var xhr = new XMLHttpRequest(); // 3.
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data; // 4.
                var gif = { // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif); // 6.
            }
        };
        xhr.send();
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>GIF search engine!</h1>
                <p>Find gif on
                    <a href='http://giphy.com'>gif</a>.Press enter to get more gifs.
                </p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});

var element = React.createElement(App);
ReactDOM.render(element, document.getElementById('app'));