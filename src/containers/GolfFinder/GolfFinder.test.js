import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from  'enzyme-adapter-react-16';
import GolfFinder from './GolfFinder';

configure({adapter: new Adapter()});

describe('<GolfFinder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<GolfFinder />);
    });
    it('should return a .golffinder__control class', () => {        
        //wrapper.setState({courses:['Test1','Test2']});
        //expect(wrapper.find(".golffinder")).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});