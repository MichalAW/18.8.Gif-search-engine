var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = '2qXggAo5zLivyMCKhqI3ltgXuuWuptTr';
App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) {
        this.setState({
            loading: true 
        });

        this.getGif(searchingText, function (gif) { 
            this.setState({
                loading: false, 
                gif: gif, 
                searchingText: searchingText 
            });
        }.bind(this));
    },

    getGif: function (searchingText, callback) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; // 2.
        var xhr = new XMLHttpRequest(); // 3.
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data; 
                var gif = { 
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif); 
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