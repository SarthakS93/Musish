import React from 'react';
import {withRouter} from 'react-router-dom';
import PageTitle from '../../common/PageTitle';
import SongList from '../common/SongList/SongList';
import PageContent from "../Layout/PageContent";

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: null,
    };
  }

  async componentDidMount() {
    const music = MusicKit.getInstance();
    const playlist = await music.api.library.playlist(
        this.props.match.params.id);

    console.log(playlist);

    this.setState({
      playlist,
    });
  }

  render() {
    if (!this.state.playlist) {
      return 'Loading...';
    }

    return (
      <PageContent>
        <PageTitle
          title={this.state.playlist.attributes.name}
          context={"My Library"}
        />
        <p>{this.state.playlist.attributes.description && this.state.playlist.attributes.description.standard}</p>
        <SongList
          songs={this.state.playlist.relationships.tracks.data}
          showArtist={true}
          showAlbum={true}
        />
      </PageContent>
    );
  }
}

export default withRouter(Playlist);
