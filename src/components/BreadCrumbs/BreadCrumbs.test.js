import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from  'enzyme-adapter-react-16';
import BreadCrumbs from './BreadCrumbs';
import { Link } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<BreadCrumbs />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BreadCrumbs />);
    });
    
    it('should return a nav element', () => {        
        expect(wrapper.find('nav')).toHaveLength(1);
    });
    it('should have a home link', () => {
        expect(wrapper.contains(<Link to="/">Home</Link>)).toEqual(true);
    });
});  