import React, { Component } from 'react';
import axios from 'axios';
import Pux from '../../hoc/Pux';
import './CourseDetails.scss';
import CourseCard from '../../components/CourseHero/CourseHero';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import decodeHtml, {stripTags} from '../../utils/utils';


class CourseDetails extends Component {

    state = {
        coursedata : null,
        courseId : null,
        courseImage: null
    }
    

    componentDidMount () {
        const courseId = this.props.match.params.id;
        if(!courseId){
            return;
        }
        axios.get('https://www.yourgolfhandicap.co.uk/wp-json/wp/v2/courses/'+courseId)
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
            });
    }

    render() {


        let imageHtml = null; 
        if(this.state.courseImage){
            imageHtml = (
                <img className="course-details__featured-image" src={this.state.courseImage} alt={this.state.coursedata.title.rendered} />
            );
        }

        return (
            <Pux>
                <div className="clearHeader">
                    {!this.state.coursedata ? 
                        null : 
                        <Pux>
                            <BreadCrumbs title={decodeHtml(this.state.coursedata.title.rendered)} />
                            <section className="hero is-light">
                                <div className="hero-body course-details-heading">
                                    <h1 className="title">
                                        {decodeHtml(this.state.coursedata.title.rendered)}
                                    </h1>
                                    <div className="columns">
                                        <div className="column">
                                            <p>
                                                {stripTags(this.state.coursedata.content.rendered)}
                                            </p>
                                        </div>
                                        <CourseCard 
                                            imageHtml={imageHtml} 
                                            title={this.state.coursedata.title.rendered}  
                                            county={this.state.coursedata['post-meta-fields']['wpcf-county']}
                                            town={this.state.coursedata['post-meta-fields']['wpcf-town']}
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
