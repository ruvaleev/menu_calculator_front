import { connect } from 'react-redux';

import { logOut, resetError } from '../../redux/slices/authentications';
import Home from './Home';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
  resetError: () => dispatch(resetError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
