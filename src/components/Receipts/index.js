import { connect } from 'react-redux';

import Receipts from './Receipts';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading
});

export default connect(mapStateToProps)(Receipts);
