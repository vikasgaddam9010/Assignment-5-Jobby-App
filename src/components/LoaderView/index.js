import Loader from 'react-loader-spinner'

const LoaderView = () => (
  <div className="btn-center" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)

export default LoaderView
