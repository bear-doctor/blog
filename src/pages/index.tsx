import React from 'react'
import Layout from '@theme/Layout'
import Hero from './_components/Hero'
import BlogSection from './_components/BlogSection'
import FeaturesSection from './_components/FeaturesSection'
import HomepageProject from './_components/ProjectSection'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Home(): JSX.Element {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext()
  const { description } = customFields as { description: string }

  return (
    <Layout title={tagline} description={description}>
      <main>
        {/* 这是首页最第一页，配置在_components/Hero中 */}
        <Hero />
        <div className="container-wrapper">
          <BlogSection />
          {/* 这是项目在首页的显示，配置在_components/ProjectSection中*/}
          <HomepageProject />
          {/* 这是个人特点在首页的显示，配置在_components/FeaturesSection中 */}
          <FeaturesSection />
        </div>
      </main>
    </Layout>
  )
}
