import { combineReducers } from 'redux';
import authReducer from './authReducer';
import medicalFileReducer from './medicalFileReducer';
import appointmentReducer from './appointmentReducer';

export default combineReducers({ authReducer ,medicalFileReducer,appointmentReducer});





