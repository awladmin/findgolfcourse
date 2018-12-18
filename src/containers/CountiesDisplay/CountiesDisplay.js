import React, { Component } from 'react';
//import axios from 'axios';
import Pux from '../../hoc/Pux';
import './CountiesDisplay.scss';
//import CourseCard from '../../components/CourseHero/CourseHero';
//import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
//import decodeHtml, {stripTags} from '../../utils/utils';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase.js';


class CountiesDisplay extends Component {

    state = {
        countyCourses: null,
        countyDisplayName:null
    }
    

    componentDidMount () {
        const county = this.props.match.params.county;
        if(!county){
            return;
        }
        

        const db = firebase.database();
        const ref = db.ref("courses");
        let revertCounty = county.replace(/-/g, " ");
        revertCounty = revertCounty.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        
            this.setState({countyDisplayName:revertCounty})


        //query term
        ref.orderByChild("wpcf-county")
            .equalTo(revertCounty)
            .on("value", (snapshot) => {
                
                if(snapshot.val()){
                    let coursesInfo = Object.values(snapshot.val());
                    //console.log(coursesInfo);
                    this.setState({countyCourses:coursesInfo});
                } else {
                    this.setState({countyCourses:null});
                }
            });
    }

    render() {

        let counties = (
            this.state.countyCourses ? 
                <div className="clearHeader">
                    <BreadCrumbs title={this.state.countyDisplayName} />
                    <section className="hero is-light">
                        <div className="hero-body course-details-heading">
                            <h1 className="title">
                                Courses in {this.state.countyDisplayName}
                            </h1>                       
                        </div>
                    </section>
                    <section className="section">
                        <div className="container">
                            <ul>
                                {
                                    this.state.countyCourses.map(course => {
                                        return <li key={course.ID}><Link to={'/course/' + course.post_name + '/' + course.ID}>{course.post_title}</Link></li>
                                    })
                                }
                            </ul>
                        </div>
                    </section>
                </div>
                : null
        )

        return (
            <Pux>
                {counties}
            </Pux>
        );
    }
}

//CountiesDisplay.propTypes = {
   //coursedata: PropTypes.array
//}

export default CountiesDisplay;
