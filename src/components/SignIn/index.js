import { connect } from 'react-redux';

import { resetError, signIn } from '../../redux/slices/authentications';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  error: state.authenticationsReducer.error,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
  isError: state.authenticationsReducer.isError,
  isLoading: state.authenticationsReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch(resetError()),
  signIn: (data) => dispatch(signIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
