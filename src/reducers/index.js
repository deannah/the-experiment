import { combineReducers } from 'redux';
import subject from './subject';
import messages from './messages';

export default combineReducers({
    subject,
    messages,
});
