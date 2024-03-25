import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import {themes as prismThemes} from 'prism-react-renderer';
import { GiscusConfig } from './src/components/Comment/index.jsx'
import social from './data/social.js'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// const beian = '闽ICP备2020017848号-2'
// const beian1 = '闽公网安备35021102000847号'

const config: Config = {
  title: '小熊博士的小窝',  //网站标题，浏览器选项卡的名称
  url: 'https://drbear.vercel.app/', //网站的域名
  baseUrl: '/',
  favicon: 'img/favicon.ico',  //网站图标的路径
  organizationName: 'bear-doctor',  //拥有这个网站的Github用户和组织
  projectName: 'blog',  //Github仓库的名称
  customFields: {
    bio: '道阻且长，行则将至',
    description:
      '小熊博士的博客，主要记录平常学习的笔记，还有一些简单的学习经历。',
  },
  themeConfig: {
    // 顶部告示条
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },

    // 全局元，用于搜索引擎优化
    metadata: [
      {
        name: 'keywords',
        content: '小熊博士, bearProfessor',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,  // 目录是否可隐藏
        autoCollapseCategories: true,  // 自动合起目录
      },
    },
    navbar: {
      logo: {
        alt: '小熊博士',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,  // 当用户向下滚动时，导航栏是否隐藏，向上翻滚就显示出来
      items: [
        {
          label: '🖥️博客',
          position: 'right',
          to: 'blog',
        },
        {
          label: '📒笔记',
          position: 'right',
          to: 'docs/skill',
        },
        {
          label: '🤖项目',
          position: 'right',
          to: 'project',
        },
        {
          label: '🔮更多',
          position: 'right',
          items: [
            { label: '🗃️归档', to: 'blog/archive' },
            { label: '✨资源', to: 'resources' },
            { label: '🙏🏻友链', to: 'friends' },
            // { label: '工具推荐', to: 'docs/tools' },
          ],
        },
        // 中英文页面
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            { label: '笔记', to: 'docs/skill' },
            { label: '实战项目', to: 'project' },
            // { label: '前端示例', to: 'https://example.kuizuo.cn' },
          ],
        },
        {
          title: '社交媒体',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: social.github.href },
            // { label: 'Twitter', href: social.twitter.href },
            // { label: '掘金', href: social.juejin.href },
            // { label: 'Discord', href: social.discord.href },
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            { label: '导航', position: 'right', to: 'resources' },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ]
      // copyright: `
      //   <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
      //   <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${beian1.match(
      //     /\d+/,
      //   )?.[0]}" >${beian1}</a></p>
      //   <p>Copyright © 2020 - PRESENT 愧怍 Built with Docusaurus.</p>
      //   `,
    },
    algolia: {
      appId: 'GV6YN1ODMO',
      apiKey: '50303937b0e4630bec4a20a14e3b7872',
      indexName: 'kuizuo',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: [
        'bash',
        'json',
        'java',
        'python',
        'php',
        'graphql',
        'rust',
        'toml',
        'protobuf',
        'cpp'
      ],
      defaultLanguage: 'javascript',
      // 行内注释的样式，官方文档code block中有提到
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    //评论
    giscus: {
      repo: 'bear-doctor/blog',
      repoId: 'R_kgDOLiU9zg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOLiU9zs4CeG7Y',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  // 预设是插件和主题的合集
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.scss'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',  // 开头默认加上node_modules的路径
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image',
    // 把插件名称和配置对象放在一个二元组中，可以对这个插件进行配置。
    ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    [
      '@docusaurus/plugin-pwa', // 插件名称
      // 插件配置
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        // 直接编辑博客文件
        // editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
        //   `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: 'hello',
        blogSidebarCount: 12,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        // RSS订阅
        // feedOptions: {
        //   type: 'all',
        //   title: '小熊博士',
        //   copyright: `Copyright © ${new Date().getFullYear()} 小熊博士 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        // },
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'bearProfessor的个人博客',
      },
    },
  ],
  // 一组要加载的CSS源
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
    // katex CSS源
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    }
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
    // localeConfigs: {
    //   en: {
    //     htmlLang: 'en-GB',
    //   },
    // },
  },
}

export default config
