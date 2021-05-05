import React, {Component} from 'react';
import vaccine from '../vaccine-img.png';
import axios from 'axios';


export default class Home extends Component{

    constructor(props){
        super(props);

        this.onChangeAge =this.onChangeAge.bind(this);
        this.onChangeEmail =this.onChangeEmail.bind(this);
        this.onChangePincode =this.onChangePincode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            age: 0,
            pincode: 0,
            district: '',
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePincode(e){
        this.setState({
            pincode: e.target.value
        });
    }

    onChangeAge(e){
        this.setState({
            age: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            age: this.state.age,
            pincode: this.state.pincode
        }

        console.log("user added: " + user);

        axios.post('https://cowin21-notify.herokuapp.com/users/add', user)
            .then(res => { console.log("after adding user: ");
            console.log(res.data);
            alert("You have registered successfully");
            })
            .catch( (err) => {
                console.log(err);
            })
    }
    render(){
        return(
            <div className="container mt-5 ">
                <div className="mb-4">
                    <h5>Tired of finding an vaccination slot? &#128548;</h5>
                    <h3>Subscribe to get Vaccine Availablity alerts &#9200;</h3>
                    <img src={vaccine} class="col-md-3"></img>
                </div>
                <div className="col-md-12 row">
                <div className="col-md-3"></div>
                <form onSubmit={this.onSubmit} className="col-md-6 form-div">
                    <div className="form-group">
                        <label className="">Email: </label>
                        <input type="email" className="form-control"
                        value={this.state.email} onChange={this.onChangeEmail} placeholder="Email">
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <select ref="ageInput" required
                        className="form-control" value={this.state.age}
                        onChange= {this.onChangeAge}>
                            <option value="">Select age group</option>
                            <option value="18"> 18+ </option>
                            <option value="45"> 45+ </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>PinCode: </label>
                        <input type="number"
                        className="form-control"
                        value= {this.state.pincode}
                        onChange = {this.onChangePincode} placeholder="Pincode">
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Subsribe for Notification" className="btn btn-success"></input>
                    </div>
                </form>
                </div>
                <div className="info-data mb-3 mt-5">
                    <p>
                        <h5>Availability of vaccine slots in your respective pincode is checked automatically every 24 hours. </h5>
                        <h5>Update notifications will be sent to your registered email-id daily at 8:00 AM.</h5>
                        <i>Want to get notifications for multiple pincodes? You can register multiple times on website.</i>
                    </p>
                </div>
                <h6 className="mb-3">
                    Want to Unsubscribe from getting notification?
                    <a href="/unsubscribe">  Unsubscribe</a>
                </h6>

            </div>
        )
    }

}