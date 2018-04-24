import React from 'react';
import {Redirect} from 'react-router-dom';
import NotFound from './NotFoundPage';
import { Grid, Row, Col } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

class CourtView extends React.Component{
	constructor(props){
		super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
	}
    
	state = { response: [],
             courtNotFound: false,
             comment: '',
             rating: 0
			};
    handleChange(event){
        console.log(this.state.comment)
        this.setState({comment: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault();
        fetch('/api/form-submit-url', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: this.state.comment,
                                 id: this.props.match.params.id,
                                 rating: this.state.rating})
        })
        .then(this.setState({comment: ''}));
    }
    onStarClick(value){
        this.setState({rating: value})
    }

	componentDidMount() {
	  this.callApi()
	    .then(res => {
	    	this.setState({ response: res })
	    })
	    .catch(err => {
	    	console.log('Did not setState to response.');
	    	console.log(err)
	    	this.setState({ courtNotFound: true })
	    });
	}

	callApi = async () => {
	  const response = await fetch('/api/court/'+this.props.match.params.id);
	  const body = await response.json();

	  if (response.status !== 200) {
	  	throw Error(body.message)
	  };

	  return body;
	};

	// Bools not yet rendered (Amenities, outdoor_status, membership_status)
	render(){
        console.log(this.state.rating)
		if(this.state.courtNotFound == true) {
			return <Redirect to="/404"/>
		}
		return (
			<div>
				<span style={{fontSize:"3em"}}>{this.props.match.params.id}</span>
				<br></br>
                
     <Grid>
        <Row className="show-grid">
            <Col xs={6} md={4}>
                <code>Park Name:<span style={{fontSize:"3em"}}>{this.state.response.map((item, court_name) => (<p>{item.court_name}</p>))}</span></code>
            </Col>
            
            
            
            <Col xs={6} md={4}>
                <code>Rating:<span style={{fontSize:"3em"}}>{this.state.response.map((item, avg_stars) => (<p>{item.avg_stars}</p>))}</span></code>
            </Col>
				
    
            <Col xs={6} md={4}>
				<code>Address:<span style={{fontSize:"3em"}}>{this.state.response.map((item, address) => (<p>{item.address}</p>))}</span></code>
                <code>Zipcode: <span style={{fontSize:"3em"}}>{this.state.response.map((item, court_zip) => (<p>{item.court_zip}</p>))}</span></code> 
            </Col>
        </Row>

				<br></br>
                                                                                                  
                                                                                                    
        <Row className="show-grid">
            <Col xs={6} md={4}>
                <code>Busiest time: <span style={{fontSize:"3em"}}>{this.state.response.map((item, busiest_times) => (<p>{item.busiest_times}</p>))}</span></code>
            </Col>
        
            <Col xs={6} md={4}>
				<code>Outdoor status: <span style={{fontSize:"3em"}}>{this.state.response.map((item, outdoor_status) => (<p>{item.outdoor_status}</p>))}</span></code>
            </Col>
                                                                                                   
            <Col xs={6} md={4}>
				<code>Membership status: <span style={{fontSize:"3em"}}>{this.state.response.map((item, membership_status) => (<p>{item.membership_status}</p>))}</span></code>
            </Col>
        </Row>
                                                                                                            
				<br></br>
        
        <Row className="show-grid">
            <Col md={6} mdPush={6}>
				<code>Open time: <span style={{fontSize:"3em"}}>{this.state.response.map((item, open_time) => (<p>{item.open_time}</p>))}</span></code>
            </Col>
        
            <Col md={6} mdPull={6}>
				<code>Close time: <span style={{fontSize:"3em"}}>{this.state.response.map((item, close_time) => (<p>{item.close_time}</p>))}</span></code>
            </Col>
        </Row>
                                                                                                         
				<br></br>
                                                                                                                 
        <Row className="show-grid">
            <Col md={6} md={6}>                                                                      
				<code>Has Fountain: <span style={{fontSize:"3em"}}>{this.state.response.map((item, has_fountain) => (<p>{item.has_fountain}</p>))}</span></code>
            </Col>
				
            <Col md={6} md={6}> 
				<code>Has Vending machine: <span style={{fontSize:"3em"}}>{this.state.response.map((item, has_vending_machine) => (<p>{item.has_vending_machine}</p>))}</span></code>
            </Col>
        </Row>
				<br></br>

        <Row className="show-grid">
            <Col xs={12} md={12}>
				<code>Court size: <span style={{fontSize:"3em"}}>{this.state.response.map((item, court_size) => (<p>{item.court_size}</p>))}</span></code>
            </Col>
        </Row>

				<br></br>

        <Row className="show-grid">
            <Col xs={6} md={4}>
				<code>Pavement quality: <span style={{fontSize:"3em"}}>{this.state.response.map((item, pavement_quality) => (<p>{item.pavement_quality}</p>))}</span></code>
			</Col>
            
            <Col xs={6} md={4}>
				<code>Cleanliness: <span style={{fontSize:"3em"}}>{this.state.response.map((item, cleanliness) => (<p>{item.cleanliness}</p>))}</span></code>
			</Col>

            <Col xs={6} md={4}>
				<code>Rim quality: <span style={{fontSize:"3em"}}>{this.state.response.map((item, rim_quality) => (<p>{item.rim_quality}</p>))}</span></code>
            </Col>
        </Row>

				<br></br>

        <Row className="show-grid">
            <Col xs={6} md={4}>
				<code>Net quality: <span style={{fontSize:"3em"}}>{this.state.response.map((item, net_quality) => (<p>{item.net_quality}</p>))}</span></code>
            </Col>

            <Col xs={6} md={4}>
                <code>Net type: <span style={{fontSize:"3em"}}>{this.state.response.map((item, net_type) => (<p>{item.net_type}</p>))}</span></code>
            </Col>

            <Col xs={6} md={4}>
				<code>Hoop height: <span style={{fontSize:"3em"}}>{this.state.response.map((item, hoop_height) => (<p>{item.hoop_height}</p>))}</span></code>
            </Col>
        </Row>


				<br></br>


        <Row className="show-grid">
            <Col md={6} md={6}>
				<code>Comment: <span style={{fontSize:"3em"}}>{this.state.response.map((comment, index) => (<p key={index}>{comment.comment_username} {comment.comment_text}</p>))}</span></code>
            </Col>

            <Col md={6} md={6}>
				<code>Comment: <span style={{fontSize:"3em"}}>{this.state.response.map((visited, index) => (<p key={index}>{visited.visited_username} {visited.has_visited}</p>))}</span></code>
            </Col>
        </Row>

    </Grid>;

				<span style={{textAlign:"left"}}>{this.state.response.map((visited, index) => (
					<p key={index}>{visited.visited_username} {visited.has_visited}</p>
				))}</span>
                <form onSubmit={this.handleSubmit}>
                    Email Address:<br/>
                    <input type="text" name="comment" onChange={this.handleChange}/><br/>
                    <StarRatingComponent name="rate1" starCount={5} onStarClick={this.onStarClick.bind(this)}/>
                    <input type="submit" value="Add Comment"/>
                </form>
                
			</div>


		)
	}
}
export default CourtView;
