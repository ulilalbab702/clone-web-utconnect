import BaseApi from "../../api/base";
import apiConfig from '../../config/api.config';

export default class VideoApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new VideoApi(apiConfig(token));
        return this.api;
    }
    videoAllGet = (PageNumber, PageSize) => {
        return this.axios.get(`/promotion/api/video?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    }
    videoDetailGet = (videoId) => {
        return this.axios.get(`/promotion/api/video/${videoId}`);
    }
    getFiturUTConnect = () => {
        return this.axios.get(`/ut-connect/api/application/childs`);
    }
}