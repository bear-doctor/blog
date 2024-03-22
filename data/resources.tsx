import { Friends } from './friends'

export interface Resource {
  name: string
  logo: string
  desc: string
  href: string
  tags?: string[]
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

const friends: Resource[] = Friends.map(f => {
  return {
    ...f,
    name: f.title,
    desc: f.description,
    logo: f.avatar!,
    href: f.website,
  }
})

export const resourceData: ResourceCategory[] = [
  {
    name: '算法基地',
    resources: [
      {
        name: 'leetcode',
        desc: '一个在线刷题平台',
        logo: '/img/resource/leetcode.svg',
        href: 'https://leetcode.cn/',
      },
      {
        name: 'Acwing',
        desc: '一个课程网站，最经典的就是其算法课程',
        logo: '/img/resource/Acwing.png',
        href: 'https://www.acwing.com/',
      },
    ],
  },
  {
    name: '图片仓库',
    resources: [
      {
        name: '阿里巴巴图标库',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能。',
        logo: '/img/resource/iconfont.svg',
        href: 'https://www.iconfont.cn/',
      },
      {
        name: 'iconscout',
        desc: 'Access 8.4 Million+ free or premium vector icons, illustrations, 3D illustrations, and Lottie animations for any design. ',
        logo: '/img/resource/iconscout.png',
        href: 'https://iconscout.com/',
      },
      {
        name: 'UnDraw',
        desc: '提供许多常用于网站，PPT的精美插画，可以调整颜色和图片格式。',
        logo: '/img/resource/undraw.ico',
        href: 'https://undraw.co/illustrations',
      },
    ],
  },
]
