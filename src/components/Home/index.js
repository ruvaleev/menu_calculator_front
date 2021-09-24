import { connect } from 'react-redux';

import { logOut, resetError, signInOmniauth } from '../../redux/slices/authentications';
import Home from './Home';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
  resetError: () => dispatch(resetError()),
  signInOmniauth: (data) => dispatch(signInOmniauth(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
