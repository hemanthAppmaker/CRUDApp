import {combineReducers} from '@reduxjs/toolkit';
import dataReducer from './dataslicer';

const rootReducer = combineReducers({post: dataReducer});

export default rootReducer;
