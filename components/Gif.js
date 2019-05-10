var GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';
var styles = {
    minHeight: '310px',
    margin: '0.5em'
};

Gif = React.createClass({
    
// It returns the address to the page with the downloaded image or to the gifa signaling the loading 
// (if it does not find the first one):
    getUrl: function() {
        return this.props.sourceUrl || GIPHY_LOADING_URL;
    },
    render: function() {
        var url = this.props.loading ? GIPHY_LOADING_URL: this.props.url;

        return (
            <div style={styles}>
                <a href={this.getUrl()} title='view this on gif' target='new'>
                    <img id='gif' src={url}/>
                </a>
            </div>
        );
    }
});