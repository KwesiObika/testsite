import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../redux/actions/countActions.js';
import * as albumActions from '../../redux/actions/albumActions.js';
import * as loginActions from '../../redux/actions/loginActions.js';
import '../../styles/photoAlbum.css';
import ReactDOM from 'react-dom'; 
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//global fuctions 
//Global classes
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAPNK3FveldY5UuKLfeHNHFRJLRoG8Zu68",
  authDomain: "picturestore-48230.firebaseapp.com",
  databaseURL: "https://picturestore-48230.firebaseio.com",
  projectId: "picturestore-48230",
  storageBucket: "picturestore-48230.appspot.com",
  messagingSenderId: "359048494620"
};
var fire = firebase.initializeApp(config);


function Image(props){
    return (
      <button className="image" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

class Album extends React.Component {
  state = {
      status: 'Next player: O',
      images: Array(9).fill(null),
      xIsNext: true,
      picture: null,
      url: ''   
  }
  handleClick(i){
    const upImages = this.state.images.slice();
    upImages[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      images: upImages,
      xIsNext: !this.state.xIsNext,
    });
  }
  renderImage(i) {
    return ( 
      <Image    
        value = {this.state.images[i]} 
        onClick={() => this.handleClick(i)} 
      />
    );
  }
  fileSelectHandler = event => {
    if(event.target.files[0]){
      const pict = event.target.files[0];
      this.setState({picture: pict});
    }
  }
  componentWillMount(){
   /* Create reference to messages in Firebase Database */
   let pics = fire.database().ref('Pictures').orderByKey().limitToLast(100);
   pics.on('child_added', snapshot => {
     /* Update React state when message is added at Firebase Database */
     let pics = { text: snapshot.val(), id: snapshot.key };
     this.setState({ picture: [pics].concat(this.state.picture) });
   })
  }
  upLoadImage = () => {
    fire.database().ref('Pictures').push( this.state.picture ); // <- Send the message
    this.setState({
      picture: null
    }); // <- clear the input
  }
  render() {
    return (
      <div>
        <div className="status">{this.state.xIsNext ? 'X' : 'O'}'s Turn</div>
        <div className="board-row">
          {this.renderImage(0)}
          {this.renderImage(1)}
          {this.renderImage(2)}
        </div>
        <div className="board-row">
          {this.renderImage(3)}
          {this.renderImage(4)}
          {this.renderImage(5)}
        </div>
        <div className="board-row">
          {this.renderImage(6)}
          {this.renderImage(7)}
          {this.renderImage(8)}
        </div>
        <input type="file" onChange={this.fileSelectHandler}/>
        <button onClick={this.upLoadImage}> upLoadImage
        </button>
      </div>
    );
  }
}
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-album">
          <Album />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

const mapStateToProps = state => {
  return {
    count: state.countReducer.count,
    isIncrementing: state.countReducer.isIncrementing,
    isDecrementing: state.countReducer.isDecrementing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countActions: bindActionCreators(countActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album)


