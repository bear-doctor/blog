export const projects: Project[] = [
  // 若有项目就按照这个格式来添加
  {
    title: '小熊博士的小窝',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/website.png',  // 显示的图片
    website: 'https://drbear.vercel.app/',  // 这个项目的链接
    source: 'https://github.com/bear-doctor/blog',  // 这是源码那个按钮的链接
    tags: ['opensource', 'design', 'favorite'],
    type: 'web', //// 这是这个项目的分类，具体可以查看原网站的呈现
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

// 标签的类型
export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

// 定义了项目的类型
export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

// 项目的类型的map
export const projectTypeMap = {
  web: '网站',
  app: '应用',
  commerce: '商业项目',
  personal: '个人',
  toy: '玩具',
  other: '其他',
}

// 一个项目项需要的值
export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
