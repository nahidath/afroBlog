import React from 'react'

import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon
} from 'react-share'

const ShareButtons = ({title, url, size}) => {

    return(
        <div>
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon  size={size} round={true}/>
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title} >
                <TwitterIcon  size={size} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon  size={size} round={true}/>
            </LinkedinShareButton>

            <RedditShareButton url={url} title={title} >
                <RedditIcon  size={size} round={true} />
            </RedditShareButton>

            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon  size={size} round={true}/>
            </WhatsappShareButton>
        </div>
    )

}
export default ShareButtons