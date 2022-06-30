import React, { useEffect } from 'react'

const TermConditionPage = (props) => {

    useEffect(() => {
        const { tokenResponse: { accessToken } } = props.user;
        async function fetchData() {
            const response = await props.fetchTermCondition(accessToken);
        }
        fetchData();
    }, []);

    const _renderTextTerm = (data) => {
        return (
            <td style={{ paddingLeft: '-1em' }}>{data.map((item) => {
                return (
                    <div style={{ paddingLeft: '-1em', paddingTop: '0.5em', whiteSpace: 'pre-wrap' }} className="contentParagraph">{item.content}</div>
                )
            })}
            </td>

        )
    }

    return (
        <div className="mt-28 px-10vw" style={{fontFamily: 'Bahnschrift'}}>
            <div className="bgContainerTC">
                <div style={{ textAlign: 'left' }}>
                    <h2 style={{ color: '#D2B520' }} className="text-3xl"><strong>Syarat dan Ketentuan</strong></h2>
                </div>
                {props.dataTermCondition != undefined ?
                    props.dataTermCondition.termAndConditionHeader != null ?
                        props.dataTermCondition.termAndConditionHeader.map((item) => {
                            return (
                                <>
                                    {item.title != "PEMBUKAAN" ?
                                        <table style={{ marginTop: '2em' }}>
                                            <tr>
                                                <td className="tncHeader2">
                                                    <strong>{item.title}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-500 px-4 text-sm">
                                                    {_renderTextTerm(item.termAndConditionDetail)}
                                                </td>
                                            </tr>

                                        </table>
                                        :
                                        null}
                                </>
                            )
                        })
                        :
                        <div style={{ marginTop: '2em' }}>
                            jj
                        </div>
                    :
                    null
                }
            </div>
        </div>
    )
};

export default TermConditionPage