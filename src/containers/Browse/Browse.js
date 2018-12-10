import React, { Component } from 'react';
//import axios from 'axios';
import Pux from '../../hoc/Pux';
import './Browse.scss';
//import CourseCard from '../../components/CourseHero/CourseHero';
//import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
//import decodeHtml, {stripTags} from '../../utils/utils';
import { Link } from 'react-router-dom';


class Browse extends Component {

    state = {
        counties: ['Buckinghamshire','Cambridgeshire','Cheshire','Cleveland','Cornwall','Cumbria','Derbyshire','Devon','Dorset','Durham','East Sussex','Essex','Gloucestershire','Greater London','Greater Manchester','Hampshire','Hertfordshire','Kent','Lancashire','Leicestershire','Lincolnshire','Merseyside','Norfolk','North Yorkshire','Northamptonshire','Northumberland','Nottinghamshire','Oxfordshire','Shropshire','Somerset','South Yorkshire','Staffordshire','Suffolk','Surrey','Tyne and Wear','Warwickshire','West Berkshire','West Midlands','West Sussex','West Yorkshire','Wiltshire','Worcestershire','Flintshire','Glamorgan','Merionethshire','Monmouthshire','Montgomeryshire','Pembrokeshire','Radnorshire','Anglesey','Breconshire','Caernarvonshire','Cardiganshire','Carmarthenshire','Denbighshire','Aberdeen City','Aberdeenshire','Angus','Argyll and Bute','City of Edinburgh','Clackmannanshire','Dumfries and Galloway','Dundee City','East Ayrshire','East Dunbartonshire','East Lothian','East Renfrewshire','Eilean Siar','Falkirk','Fife','Glasgow City','Highland','Inverclyde','Midlothian','Moray','North Ayrshire','North Lanarkshire','Orkney Islands','Perth and Kinross','Renfrewshire','Scottish Borders','Shetland Islands','South Ayrshire','South Lanarkshire','Stirling','West Dunbartonshire','West Lothian','Antrim','Armagh','Down','Fermanagh','Derry and Londonderry','Tyrone']
    }

    render() {

        return (
            <Pux>
                <div className="clearHeader">
                    <BreadCrumbs title="All" />
                    <section className="hero is-light">
                        <div className="hero-body course-details-heading">
                            <h1 className="title">
                                Course Directory
                            </h1>                       
                        </div>
                    </section>
                    <section className="section">
                        <div className="container">
                            <ul>
                                {this.state.counties.map(county => {
                                    let prepareCounty = county.replace(/ /gi,"-").toLowerCase();
                                    return <li key={prepareCounty}><Link to={'/county/' + prepareCounty}>{county}</Link></li>
                                })}
                            </ul>
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
