import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'

import type { Props } from '@theme/BlogLayout'

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props
  const hasSidebar = sidebar && sidebar.items.length > 0

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--md">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          {/* 这是主体 */}
          <main
            className={clsx('col', {
              // 如果有侧边栏
              'col--6': hasSidebar,
              // 如果没有侧边栏
              'col--6 col--offset-2': !hasSidebar,
            })}
            itemScope
            itemType="h ttp://schema.org/Blog"
          >
            {children}
          </main>
          {/* 右侧文档目录 侧边栏占页面2份，主体8份，文档目录占2份*/}
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
