import React, { Component } from 'react';
//import axios from 'axios';
//import Pux from '../../hoc/Pux';
import './GolfFinder.scss';
import PropTypes from 'prop-types';
import * as actionTypes from  '../../store/actions/actionTypes';
import loader from '../../assets/images/loader.png';
import decodeHtml from '../../utils/utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import firebase from '../../Firebase.js';


export class GolfFinder extends Component {

    state = {
        courses: [],
        showResults: false,
        fetchingData: false,
        fetchTimout: null,
        hoveredResultIndex: -1,
        searchesmade : 0
    }    

    getCourses = (term) => {
        this.setState({fetchingData: true});

        
        
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const ref = db.collection("courses");
        let results = [];
        ref.where("searchTitle", ">=", term)
            .limit(10)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((course) => {
                    results.push(course.data());
                });
                if(results.length){
                    this.setState({
                        courses:results,
                        fetchingData: false,
                        showResults:true
                    });
                } else {
                    this.setState({
                        courses:[],
                        showResults:false,
                        fetchingData: false,
                        hoveredResultIndex: -1
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    courses:[],
                    showResults:false,
                    fetchingData: false,
                    hoveredResultIndex: -1
                });
            });
        
        

       


        
        /*
        const clouddb = firebase.firestore();
        // Disable deprecated features
        clouddb.settings({
            timestampsInSnapshots: true
        });
        const ref = clouddb.collection("courses");

            //Legacy data transform
            let count = 0;
            ref.get()
                .then((querySnapshot) => {
                    console.log("querySnapshot: ",querySnapshot);
                    querySnapshot.forEach((course) => count++);
                    console.log("count in cloud db: ",count);
                });
        
        let oldcount = 0;
        const rtdb = firebase.database();
        const rtref = rtdb.ref("courses");
        
        rtref.orderByKey()
            //.limitToFirst(10)
            .startAt("0")
            .once("value")
            .then(((snapshot) => {
                console.log("snapshot: ",snapshot.val());
                
                const courseData = snapshot.val();
            

                courseData.forEach((meta) => {
                    
                    oldcount++;
                    
                    let newData = {
                        id: meta.ID,
                        title : meta.post_title,
                        searchTitle: meta.post_title.toLowerCase(),
                        desc : meta.post_content,
                        addressLine1: (meta['wpcf-address-line-1']) ? meta['wpcf-address-line-1'].toLowerCase() : '',
                        town: (meta['wpcf-town']) ? meta['wpcf-town'].toLowerCase() : '',
                        county: (meta['wpcf-county']) ? meta['wpcf-county'].toLowerCase() : '',
                        postcode: (meta['wpcf-postcode']) ? meta['wpcf-postcode'].toLowerCase() : '',
                        country: (meta['wpcf-country']) ? meta['wpcf-country'].toLowerCase() : '',
                        email: (meta['wpcf-email']) ? meta['wpcf-email'].toLowerCase() : '',
                        phone: (meta['wpcf-phone']) ? meta['wpcf-phone'].toLowerCase() : '',
                        rounds: (meta['wpcf-rounds-at-course']) ? meta['wpcf-rounds-at-course'] : '',
                        website: (meta['wpcf-website']) ? meta['wpcf-website'] : '',
                        lat: (meta['wpcf-latitude']) ? meta['wpcf-latitude'] : '',
                        long: (meta['wpcf-longitude']) ? meta['wpcf-longitude'] : '',
                        scorecards: (meta['wpcf-course-scorecards']) ? meta['wpcf-course-scorecards'] : '',
                        tees: (meta['sc-course-tees']) ? meta['sc-course-tees'] : '',
                        image: (meta.image) ? meta.image : '',
                        slug: meta.post_name,
                        twitter: (meta.twitter) ? meta.twitter : '',
                        facebook: (meta.facebook) ? meta.facebook : ''
                    }
                    
                    console.log("newData: ",newData);
                    console.log("oldcount: ",oldcount);
                    clouddb.collection("courses").doc(meta.ID).set(newData);
                    
                    
                });
                

                console.log("realtime count: ",oldcount);

            }))
            .catch(error => {
                //
                console.log("error happened: ",error);
            }); 
            
           */
        
        
            
    }

    searchTypeHandler = (event) => {
        const term = event.target.value;
        const keyCode = event.keyCode;

        if(keyCode === 38){
            this.selectNextResultUp();
            return;
        } else if(keyCode === 40) {
            this.selectNextResultDown();
            return;
        } else if(keyCode === 13) {
            if(this.state.hoveredResultIndex >= 0 && this.state.courses.length > 0){
                this.loadCourseDetailspage(this.state.hoveredResultIndex,null);
            }
            return;
        }

        if(term.length > 2) {
            //set tomout so doesn't call multiples
            if(this.state.fetchTimout){
                clearTimeout(this.state.fetchTimout);
            }
            this.setState({
                fetchTimout:setTimeout(() => {
                    this.getCourses(term);
                    this.props.onSearchMade();
                },500)
            });
        } else {
            this.closeResults();
        }
    }

    selectNextResultUp = () => {
        const currentState = {...this.state};
        const newIndex = currentState.hoveredResultIndex-1;
        if(newIndex < 0){
            return;
        }
        currentState.hoveredResultIndex = newIndex;
        this.setState(currentState);
    }

    selectNextResultDown = () => {
        const currentState = {...this.state};
        const newIndex = currentState.hoveredResultIndex+1;
        if(newIndex >= currentState.courses.length){
            return;
        }
        currentState.hoveredResultIndex = newIndex;
        this.setState(currentState);
    }

    closeResults = () => this.setState({
        courses:[],
        showResults:false,
        hoveredResultIndex: -1
    });

    resultHovered = (i) => {
        this.setState({hoveredResultIndex:i});
    }

    formSubmission = (event) => {
        //stop sumission
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    loadCourseDetailspage = (i,event) => {
        
        const courseData = this.state.courses[i];
        //console.log("courseData (going to): ",courseData);
        this.props.history.push('/course/'+courseData.slug+'/'+courseData.id);

        if(event){
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }

    render() {

        //maybe export this
        const meta = {
            title: 'UK Golf Course Finder',
            description: 'Search for over 3000 golf courses in the United Kingdom.',
            //canonical: 'http://example.com/path/to/page',
            meta: {
              charset: 'utf-8',
              name: {
                keywords: 'golf, courses, golf club, England, Wales, Scotland, Northern Ireland, Ireland.'
              }
            }
        };

        const courses = this.state.courses.map((course,i) => {
            
            let usable = true;
            if(!course.title) {
                usable = false;
            }
            
            return (
                (!usable) ? null : 
                <li onMouseEnter={li => this.resultHovered(i)} onMouseLeave={li => this.resultHovered(-1)} className="search-results__listitem" key={course.id}>
                    <Link 
                        className={(i === this.state.hoveredResultIndex) ? 'search-results__listlink search-results__listlink--active' : 'search-results__listlink'}
                        to={{
                            pathname : 'course/'+course.slug+'/'+course.id
                    }}>{decodeHtml(course.title)}</Link>
                </li>
            )
        });
        const courseslist = (this.state.courses.length) ? 
            <div className="search-results"><ul className="search-results__list">{courses}</ul></div> : null;

        return (
            <DocumentMeta {...meta}>
                <section className='hero is-fullheight'>
                    <div className="hero-body">
                        <div className="container">
                            <div className="golffinder">
                                <p>Searches made (Redux persisted): {this.props.searchesmade}</p>
                                <form onSubmit={event => this.formSubmission(event)}>
                                    <div className="field">
                                        <label className="label is-hidden">Find a Golf Course</label>
                                        <div className="control golffinder__control">
                                            <input /*onBlur={this.closeResults}*/ onKeyUp={this.searchTypeHandler} className="input" type="text" placeholder="Find a Golf Course" />
                                            {(this.state.fetchingData) ? <img className="golffinder__control-loader" src={loader} alt="Loading" /> : null}
                                            {courseslist}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </DocumentMeta>
        );
    }
}

GolfFinder.propTypes = {
    searchTypeHandler: PropTypes.func
}

const mapStateToProps = state => {
    return {
        searchesmade: state.ctr.searchesmade
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchMade: () => dispatch({type: actionTypes.INC_SEARCHES})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GolfFinder);
