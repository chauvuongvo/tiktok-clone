import PropTypes from 'prop-types';
import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Action.module.scss';
import ActionItem from './ActionItem';
import {
  ArrowIcon,
  ArrowPopperIcon,
  EmailActionIcon,
  EmbedActionIcon,
  FacebookActionIcon,
  LineActionIcon,
  LinkActionIcon,
  LinkedlnActionIcon,
  PinterestActionIcon,
  RedditActionIcon,
  SendActionIcon,
  TelegramActionIcon,
  TwitterActionIcon,
  WhatAppsActionIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

function Action({
  className,
  children,
  delay = [0, 500],
  offset = [-25, 12],
  placement = 'top-start',
}) {
  const actionList = [
    {
      id: 0,
      href: '#',
      icon: <EmbedActionIcon />,
      title: 'Embed',
    },
    {
      id: 1,
      href: '#',
      icon: <SendActionIcon />,
      title: 'Send to friends',
    },
    {
      id: 2,
      href: 'https://www.facebook.com/sharer/sharer.php?app_id=113869198637480&display=popup&sdk=joey&u=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <FacebookActionIcon />,
      title: 'Share to Facebook',
    },
    {
      id: 3,
      href: 'https://wa.me/?text=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <WhatAppsActionIcon />,
      title: 'Share to WhatsApp',
    },
    {
      id: 4,
      href: '#',
      icon: <LinkActionIcon />,
      title: 'Copy link ',
    },
    {
      id: 5,
      href: 'https://twitter.com/intent/tweet?refer_source=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc&text=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <TwitterActionIcon />,
      title: 'Share to Twitter',
    },
    {
      id: 6,
      href: 'https://www.linkedin.com/sharing/share-offsite?url=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <LinkedlnActionIcon />,
      title: 'Share to LinkedIn',
    },
    {
      id: 7,
      href: 'https://www.reddit.com/submit?url=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <RedditActionIcon />,
      title: 'Share to Reddit',
    },
    {
      id: 8,
      href: 'https://t.me/share/url?text=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc&url=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <TelegramActionIcon />,
      title: 'Share to Telegram',
    },
    {
      id: 9,
      href: 'mailto:?body=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc&subject=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <EmailActionIcon />,
      title: 'Share to Email',
    },
    {
      id: 10,
      href: 'https://lineit.line.me/share/ui?text=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc&url=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <LineActionIcon />,
      title: 'Share to Line',
    },
    {
      id: 11,
      href: 'https://pinterest.com/pin/create/button/?desc=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc&media=https%3A%2F%2Flf16-tiktok-web.ttwstatic.com%2Fobj%2Ftiktok-web-common-sg%2Fmtact%2Fstatic%2Fimages%2Fshare_img.png&url=https%3A%2F%2Fwww.tiktok.com%2F%40moonaov%2Fvideo%2F7131309705506376987%3Fis_from_webapp%3D1%26sender_device%3Dpc',
      icon: <PinterestActionIcon />,
      title: 'Share to Pinterest',
    },
  ];

  const actionSimplyList = actionList.slice(0, 5);

  const [seeMore, setSeeMore] = useState(true);
  const [actionRender, setActionRender] = useState(actionSimplyList);

  const handleSeeMore = () => {
    setSeeMore(false);
    setActionRender(actionList);
  };

  const handleHidePopper = () => {
    setActionRender(actionSimplyList);
    setSeeMore(true);
  };

  return (
    <HeadlessTippy
      interactive
      delay={delay}
      offset={offset}
      placement={placement}
      popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
      onHide={handleHidePopper}
      render={(attrs) => (
        <div {...attrs}>
          <PopperWrapper className={cx('wrapper', className)}>
            <div className={cx('list-action')}>
              {actionRender.map((item) => (
                <ActionItem key={item.id} icon={item.icon} href={item.href}>
                  {item.title}
                </ActionItem>
              ))}

              {seeMore && (
                <div className={cx('arrow-action')} onClick={handleSeeMore}>
                  <ArrowIcon />
                </div>
              )}
            </div>

            {/* Wrap SVG Icon with div append to document Tippy */}
            <div data-popper-arrow="">
              <ArrowPopperIcon className={cx('arrow-popper')} />
            </div>
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </HeadlessTippy>
  );
}

Action.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.array,
  offset: PropTypes.array,
  placement: PropTypes.string,
  className: PropTypes.string,
};

export default Action;
