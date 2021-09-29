import { connect } from 'react-redux';

import Settings from './Settings';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading
});

export default connect(mapStateToProps)(Settings);
