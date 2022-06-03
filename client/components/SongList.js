import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import query from '../queries/fetchSongList';

class SongList extends Component {

    constructor(props) {
        super(props)
    }

    onSongDelete(id) {
        this.props.mutate({
            variables: {
                id
            }
        }).then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.loading ? <div>Loading...</div> : this.props.data.songs.map((song, i) => {
            const { id, title } = song;
            return (
                <li key={i} className="collection-item">
                    <Link to={`/songs/${id}`}>
                        {title}
                    </Link>
                    <i className="material-icons" onClick={this.onSongDelete.bind(this, id)}>delete</i>
                </li>
            )
        })
    }
    
    render() {
        return (
            <div>
                <h2>Song Creator</h2>
                <ul className="collection"><div>{this.renderSongs()}</div></ul>
                <Link to='/songs/new' className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
      deleteSong(id: $id){
        id
        title
      }
    }
  `;

export default graphql(mutation)(
    graphql(query)(SongList));