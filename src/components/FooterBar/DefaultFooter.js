import React, { Component } from 'react';
import {
    IconAppStore,
    IconPlayStore,
    IconFacebook,
    IconInstagram,
    IconTwitter
} from "../../assets/icons";
import './DefaultFooter.style.css';
import { Row, Col } from 'reactstrap';

class DefaultFooter extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="widthfooter">
                    <Row className="firstfooter">
                        <Col xl="3" lg="3" md="10" className="f1">
                            <div>
                                <Col lg="15" md="10" className='marginFooterTitle'>
                                    <p className="fontfooter"><strong>UT Connect </strong> adalah aplikasi yang dikembangkan untuk memberikan layanan terbaik bagi pelanggan United Tractors.
                                    </p>
                                </Col>
                                <p className="marginfooter" ><strong className="fontfooterDownload">Download</strong></p>
                                <table className="defaultIcon">
                                    <tr>
                                        <td>
                                            <a href="https://apps.apple.com/id/app/united-tractors-mobile-app/id1459956543" target="_blank">
                                                <img src={IconAppStore} className="downloadIcon" />
                                            </a>
                                        </td>
                                        <td>
                                            <a href='https://play.google.com/store/apps/details?id=com.unitedtractors.customer_portal&hl=en&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank">
                                                <img alt='Get it on Google Play' src={IconPlayStore} className="downloadIcon" />
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </Col>
                        <Col xl="3" lg="3" md="4" className="f1">
                            <p className="spanfirstfooter marginfooter">UT Connect</p>
                            <p className="fontfooter marginfooter"> Equipment Monitoring</p>
                            <p className="fontfooter marginfooter"> Order Tracking</p>
                            <p className="fontfooter marginfooter"> Notifikasi </p>
                            <p className="fontfooter marginfooter"> My Ticket </p>
                            <p className="fontfooter marginfooter"> Promosi </p>
                        </Col>
                        <Col xl="3" lg="3" md="5" >
                            <p className="spanfirstfooter margincolumntiga ">Hubungi Kami</p>
                            <table className="marginfooter">
                                <tr>
                                    <td className="fontfooter">Telepon</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">:</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">(021) 24579999</td>
                                </tr>
                                <tr>
                                    <td className="fontfooter">Website</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">:</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter"><a href="http://www.unitedtractors.com" className="footerahref" target="_blank">www.unitedtractors.com</a></td>
                                </tr>
                                <tr>
                                    <td className="fontfooter">Email</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">:</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">
                                        <span
                                            className="footerahref"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                window.open("mailto:utmobileapp@unitedtractors.com?subject=Question for UT Connect Team");
                                            }}
                                        >utmobileapp@unitedtractors.com </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fontfooter">Alamat</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">:</td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">PT. United Tractors, Tbk</td>
                                </tr>
                                <tr>
                                    <td className="fontfooter"></td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter"></td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">Jl. Raya Bekasi KM 22, Cakung,</td>
                                </tr>
                                <tr>
                                    <td className="fontfooter"></td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter"></td>
                                    <td className="fontfooter"> </td>
                                    <td className="fontfooter">Jakarta Timur, 13190</td>
                                </tr>
                            </table>
                        </Col>
                        <Col xl="3" lg="3" md="4" className="floatkanan">
                            <p className="marginfooter" style={{ fontWeight: 'bold', fontSize: '15px' }}>Ikuti Kami</p>
                            <div className="marginfooter">
                                <div className="fontfooter">
                                    <a href="https://id-id.facebook.com/ptunitedtractorstbk/" className="footerahref" target="_blank"><img src={IconFacebook} width="20" className="paddingimagefooter" />facebook.com/ptunitedtractorstbk</a>
                                </div>
                                <div className="fontfooter" style={{ whiteSpace: 'nowrap' }} >
                                    <a href="https://www.instagram.com/unitedtractors.connect/?hl=id" className="footerahref" target="_blank"><img src={IconInstagram} width="20" className="paddingimagefooter" />instagram.com/unitedtractors.connect</a>
                                </div>
                                <div className="fontfooter">
                                    <a href="https://twitter.com/unitedtractors?lang=id" className="footerahref" target="_blank"><img src={IconTwitter} width="20" className="paddingimagefooter" />twitter.com/unitedtractors</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="footerStyle">
                            <Row>
                                <Col lg="6" md="6" xs="12" className="textalignFirst">
                                    <span className="marginleftfootercopy">&copy; 2021 United Tractors - All rights reserved.</span>
                                </Col>
                                <Col lg="6" md="6" xs="12" className="textalign">
                                    {/* <Link to="/Home/termcondition" className="footterm"><span className="spanprivacyfooter">Terms & Conditions</span></Link> */}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default DefaultFooter;
