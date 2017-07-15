import FieldErrorDTO from './FieldErrorDTO';

// Generic errors type here
// this way we can reuse this class no matter what type of error we want to include
export default class<T> {
    errorType: String;
    errors: T;
}