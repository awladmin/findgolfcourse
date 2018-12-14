import React, { Component } from 'react';
import axios from 'axios';
//import Pux from '../../hoc/Pux';
import './GolfFinder.scss';
import PropTypes from 'prop-types';
import loader from '../../assets/images/loader.png';
import decodeHtml from '../../utils/utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';


class GolfFinder extends Component {

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
        axios.get('https://www.yourgolfhandicap.co.uk/wp-json/wp/v2/courses?per_page=10&search='+term)
            .then(response => {
                this.setState({
                    courses:response.data,
                    fetchingData: false,
                    showResults:true
                });
            })
            .catch(error => {
                this.setState({
                    courses:[],
                    showResults:false,
                    fetchingData: false,
                    hoveredResultIndex: -1
                });
            });
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
            return (
                <li onMouseEnter={li => this.resultHovered(i)} onMouseLeave={li => this.resultHovered(-1)} className="search-results__listitem" key={course.id}>
                    <Link 
                        className={(i === this.state.hoveredResultIndex) ? 'search-results__listlink search-results__listlink--active' : 'search-results__listlink'}
                        to={{
                            pathname : 'course/'+course.slug+'/'+course.id
                    }}>{decodeHtml(course.title.rendered)}</Link>
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
                                <p>Searches made: {this.props.searchesmade}</p>
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
        searchesmade: state.searchesmade
    }
}

const mapDispatchToProps = dispatch =>  {
    return {
        onSearchMade: () => dispatch({type: 'INC_SEARCHES'})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(GolfFinder);
