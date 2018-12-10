import React, { Component } from 'react';
//import axios from 'axios';
import Pux from '../../hoc/Pux';
import './Browse.scss';
//import CourseCard from '../../components/CourseHero/CourseHero';
//import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
//import decodeHtml, {stripTags} from '../../utils/utils';


class Browse extends Component {

    
    

    componentDidMount () {
        /*const courseId = this.props.match.params.id;
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
            });*/
    }

    render() {

        return (
            <Pux>
                <div className="clearHeader">
                    <BreadCrumbs title="Browse" />
                    <section className="hero is-light">
                        <div className="hero-body course-details-heading">
                            <h1 className="title">
                                Browse Pages
                            </h1>                       
                        </div>
                    </section>
                </div>
            </Pux>
        );
    }
}

//Browse.propTypes = {
   //coursedata: PropTypes.array
//}

export default Browse;
