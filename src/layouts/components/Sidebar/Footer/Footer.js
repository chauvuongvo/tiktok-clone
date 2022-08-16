import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import SectionWrapper from '../SectionWrapper';
import RenderLink from './RenderLink';

const cx = classNames.bind(styles);

function Footer({ className }) {
  const aboutList = [
    { title: 'About', href: 'https://www.tiktok.com/about?lang=en' },
    {
      title: 'TikTok Browse',
      href: 'https://www.tiktok.com/browse/?lang=en-us',
    },
    { title: 'Newsroom', href: 'https://newsroom.tiktok.com/en-us/?lang=en' },
    { title: 'Contact', href: 'https://www.tiktok.com/about/contact?lang=en' },
    { title: 'Careers', href: 'https://careers.tiktok.com/?lang=en' },
    { title: 'ByteDance', href: 'https://www.bytedance.com/?lang=en' },
  ];

  const advertiseList = [
    {
      title: 'TikTok for Good',
      href: 'https://www.tiktok.com/forgood?lang=en',
    },
    {
      title: 'Advertise',
      href: 'https://www.tiktok.com/business/en?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&lang=en&refer=tiktok_web&tt4b_lang_redirect=1',
    },
    {
      title: 'Developers',
      href: 'https://developers.tiktok.com/?lang=en&refer=tiktok_web',
    },
    {
      title: 'Transparency',
      href: 'https://www.tiktok.com/transparency?lang=en',
    },
    {
      title: 'TikTok Rewards',
      href: 'https://www.tiktok.com/tiktok-rewards/eligibility/',
    },
  ];

  const helpList = [
    { title: 'Help', href: 'https://support.tiktok.com/en?lang=en' },
    {
      title: 'Safety',
      href: 'https://www.tiktok.com/safety?lang=en',
    },
    {
      title: 'Terms',
      href: 'https://www.tiktok.com/legal/terms-of-service?lang=en',
    },
    {
      title: 'Privacy',
      href: 'https://www.tiktok.com/legal/privacy-policy-row?lang=en',
    },
    {
      title: 'Creator Portal',
      href: 'https://www.tiktok.com/creators/creator-portal/en-us/?lang=en',
    },
    {
      title: 'Community Guidelines',
      href: 'https://www.tiktok.com/community-guidelines?lang=en',
    },
  ];

  return (
    <SectionWrapper className={cx('wrapper', className)}>
      <RenderLink data={aboutList} />
      <RenderLink data={advertiseList} />
      <RenderLink data={helpList} />
      <span className={cx('copyright')}>© 2022 TikTok</span>
    </SectionWrapper>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
