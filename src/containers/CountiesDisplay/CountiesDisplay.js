import React, { Component } from 'react';
//import axios from 'axios';
import Pux from '../../hoc/Pux';
import './CountiesDisplay.scss';
//import CourseCard from '../../components/CourseHero/CourseHero';
//import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
//import decodeHtml, {stripTags} from '../../utils/utils';
//import { Link } from 'react-router-dom';


class CountiesDisplay extends Component {

    state = {
        countyraw : null,
        countyDisplayName : null,
        countyCourses: null
    }
    

    componentDidMount () {
        const county = this.props.match.params.county;
        console.log("county: ",county)
        if(!county){
            return;
        }
        /*axios.get('https://www.yourgolfhandicap.co.uk/wp-json/wp/v2/courses/'+courseId)
            .then(response => {
                this.setState({coursedata:response.data,fetchingImage:true});
                console.log("response.data: ",response.data);
            }).then(response => {
               
                if(this.state.coursedata._links['wp:featuredmedia']){
                    let mediaEndPoint = this.state.coursedata._links['wp:featuredmedia'][0].href;
                    axios.get(mediaEndPoint)
                    .then(media => {
                        if(media.data.source_url) {
                            this.setState({courseImage:media.data.source_url,fetchingImage:false});    
                        }
                    });
                } else {
                    this.setState({fetchingImage:false});
                }                
            });*/
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
                                    //this.state.countyCourses.map(course => {
                                        //return <li><Link to={'/county/' + prepareCounty}>{course.title}</Link></li>
                                    //})
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
