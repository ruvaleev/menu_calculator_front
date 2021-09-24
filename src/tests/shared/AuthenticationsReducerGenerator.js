function AreasReducerGenerator({
  authToken = null, isAuthenticated = false, isLoading = false, isError = false, error = null, user = null
}) {
  return {
    authToken, isAuthenticated, isLoading, isError, error, user
  };
}

export default AreasReducerGenerator;
