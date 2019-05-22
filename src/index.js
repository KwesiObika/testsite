import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Snap from './Snap';
import * as serviceWorker from './serviceWorker';

class Footer  extends React.Component {
  render() {
    return (
    	<div>
	        <header className="footer">
	          Footer
	        </header>
      	</div>
    );
  }
}
function Header(props){
  return (
  	<div className="header" onClick={props.onClick}>
  	   	Header
	</div>
  );
}
class WebSite extends React.Component {
	state = {
		status: true
	}
	handleClick(){
		var upImages = this.state.status;
		upImages = !(this.state.status);
		console.log(upImages);
		this.setState({
		  status: upImages
		});
	}
	renderPage() {
	    return ( 
	      <Header 
	        onClick={() => this.handleClick()} 
	      />
	    );
  	}
  	showPage() {
  		var page;
  		if (this.state.status === true) {
  			page = <App/>;
  		}
  		else {
  			page = <Snap/>;
  		}
  		return ( 
	      page
	    );
  	}
	render() {
		return(
			<div>
				{this.renderPage()}
				{this.showPage()}
				<Footer/>
			</div>
		);
	}
}

ReactDOM.render(<WebSite />, document.getElementById('root')); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
 