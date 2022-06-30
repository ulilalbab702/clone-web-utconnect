import HomePage from './HomePage';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getAllVideo, getFiturUTConnectAction } from '../../actions/video';
import { imageSlider } from "../../actions/promotions";
import { listNewsHome } from '../../actions/listNews';

const mapStateToProps = state => ({
    ...state.user,
    imageSlider: state.promotions.promotion.image,
    videoData: state.video.video.data,
    dataFitur: state.video.fitur.dataFitur,
    newsHome: state.listNews.listNews.newsHome,
    // dataFitur: console.log(JSON.stringify(state)),
});

const mapDispatchToProps = dispatch => ({
    push: (url) => dispatch(push(url)),
    fetchImageslider: () => dispatch(imageSlider()),
    fetchGetAllVideo: (PageNumber, PageSize) => dispatch(getAllVideo(PageNumber, PageSize)),
    fetchGetFiturUTConnect: () => dispatch(getFiturUTConnectAction()),
    fetchListNews: (attributeValue, PageSize, PageNumber) => dispatch(listNewsHome(attributeValue, PageSize, PageNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);