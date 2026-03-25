import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github'
  },
  {
    label: 'Linkedin',
    url: `https://www.linkedin.com/in/${config.linkedin}`,
    icon: 'linkedin'
  },
  {
    label: 'workana',
    url: `https://www.workana.com/freelancer/${config.workana}`,
    icon: 'workana'
  },
  {
    label: 'Instagram',
    url: `https://www.instagram.com/${config.instagram}`,
    icon: 'instagram'
  }
];
