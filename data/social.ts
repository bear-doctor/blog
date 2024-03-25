export type Social = {
  github?: string
  // twitter?: string
  // juejin?: string
  bilibili?: string
  qq?: string
  wx?: string
  // cloudmusic?: string
  // zhihu?: string
  email?: string
  // discord?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/bear-doctor',
  // twitter: 'https://twitter.com/kuizuo',
  // juejin: 'https://juejin.cn/user/1565318510545901',
  bilibili: 'https://space.bilibili.com/198671295?spm_id_from=333.1007.0.0',
  qq: 'https://bear-img-1319754387.cos.ap-guangzhou.myqcloud.com/website/social/qq.jpg',
  wx: 'https://bear-img-1319754387.cos.ap-guangzhou.myqcloud.com/website/social/wechat.jpg',
  // zhihu: 'https://www.zhihu.com/people/kuizuo',
  // cloudmusic: 'https://music.163.com/#/user/home?id=1333010742',
  email: 'mailto:bear_professor@outlook.com',
  // discord: 'https://discord.gg/M8cVcjDxkz',
}

const socialSet: Record<keyof Social | 'rss', SocialValue> = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  bilibili: {
    href: social.bilibili,
    title: 'bilibili',
    icon: 'ri:bilibili-line',
    color: '#fb7299',
  },
  // juejin: {
  //   href: social.juejin,
  //   title: '掘金',
  //   icon: 'simple-icons:juejin',
  //   color: '#1E81FF',
  // },
  // twitter: {
  //   href: social.twitter,
  //   title: 'Twitter',
  //   icon: 'ri:twitter-line',
  //   color: '#1da1f2',
  // },
  // discord: {
  //   href: social.discord,
  //   title: 'Discord',
  //   icon: 'ri:discord-line',
  //   color: '#5A65F6',
  // },
  qq: {
    href: social.qq,
    title: 'QQ',
    icon: 'ri:qq-line',
    color: '#1296db',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  // zhihu: {
  //   href: social.zhihu,
  //   title: '知乎',
  //   icon: 'ri:zhihu-line',
  //   color: '#1772F6',
  // },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  // cloudmusic: {
  //   href: social.cloudmusic,
  //   title: '网易云',
  //   icon: 'ri:netease-cloud-music-line',
  //   color: '#C20C0C',
  // },
  // rss: {
  //   href: '/blog/rss.xml',
  //   title: 'RSS',
  //   icon: 'ri:rss-line',
  //   color: '#FFA501',
  // },
}

export default socialSet
