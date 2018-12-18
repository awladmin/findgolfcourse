import React, { Component } from 'react';
//import axios from 'axios';
import Pux from '../../hoc/Pux';
import './CourseDetails.scss';
import CourseCard from '../../components/CourseHero/CourseHero';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import decodeHtml, {stripTags} from '../../utils/utils';
import firebase from '../../Firebase.js';


class CourseDetails extends Component {

    state = {
        coursedata : null,
        courseId : null,
    }
    

    componentDidMount () {

        
        const courseId = this.props.match.params.id;
        if(!courseId){
            return;
        }

        const db = firebase.database();
        const ref = db.ref("courses");

        //console.log("ref: ",ref);

        //query term
        ref.orderByChild("ID")
            .equalTo(courseId)
            .on("value", (snapshot) => {
                //console.log("snapshot: ",snapshot.val());
                let coursesInfo = Object.values(snapshot.val());
                console.log(coursesInfo)
                if(coursesInfo.length){
                    this.setState({coursedata:coursesInfo[0]});
                } else {
                    this.setState({coursedata:null});
                }
            });

        
    }

    render() {

        if(this.state.coursedata && this.state.coursedata.post_title){
            document.title = decodeHtml(this.state.coursedata.post_title);
        }

        return (
            <Pux>
                <div className="clearHeader">
                    {!this.state.coursedata ? 
                        null : 
                        <Pux>
                            <BreadCrumbs title={decodeHtml(this.state.coursedata.post_title)} />
                            <section className="hero is-light">
                                <div className="hero-body course-details-heading">
                                    <h1 className="title">
                                        {decodeHtml(this.state.coursedata.post_title)}
                                    </h1>
                                    <div className="columns">
                                        <div className="column">
                                            <p>
                                                {stripTags(this.state.coursedata.post_content)}
                                            </p>
                                        </div>
                                        <CourseCard 
                                            image={this.state.coursedata.image} 
                                            title={this.state.coursedata.post_title}  
                                            address1={this.state.coursedata['wpcf-address-line-1']}
                                            county={this.state.coursedata['wpcf-county']}
                                            town={this.state.coursedata['wpcf-town']}
                                            country={this.state.coursedata['wpcf-country']}
                                            postcode={this.state.coursedata['wpcf-postcode']}
                                            phone={this.state.coursedata['wpcf-phone']}
                                            email={this.state.coursedata['wpcf-email']}
                                            facebook={this.state.coursedata['wpcf-facebook']}
                                            twitter={this.state.coursedata['wpcf-twitter']}
                                            website={this.state.coursedata['wpcf-website']}
                                            />                                        
                                    </div>                                    
                                </div>
                            </section>
                        </Pux>}
                </div>
                    
            </Pux>
        );
    }
}

CourseDetails.propTypes = {
   coursedata: PropTypes.array
}

export default CourseDetails;
