import React from 'react';
import clsx from 'clsx'
import useGlobalData from '@docusaurus/useGlobalData';
import type {
  BlogTag,
  BlogTags,
  BlogPost,
} from '@docusaurus/plugin-content-blog';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
// import { SocialLinks } from '@site/src/components/SocialLinks';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { projects } from '@site/data/projects';
import { resourceData } from '@site/data/resources';
import { usePluginData } from '@docusaurus/useGlobalData'
import styles from './styles.module.scss'
import SocialLinks from '@site/src/components/SocialLinks'

let Fade; // 声明一个全局变量来保存 Fade

import("react-awesome-reveal").then(module => {
  Fade = module.default.Fade; // 将 Fade 赋值给全局变量
}).catch(error => {
  console.error("Failed to import react-awesome-reveal:", error);
});

type Count = {
  blog: number;
  tag: number;
  doc: number;
  project: number;
};

export function BlogUser({ isNavbar = false }: { isNavbar?: boolean }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const { bio } = customFields as { bio: string }

  const {
    navbar: { title, logo = { src: '' } },
  } = useThemeConfig()

  const logoLink = useBaseUrl(logo.src || '/')

  const blogData = usePluginData('docusaurus-plugin-content-blog') as {
    posts: BlogPost[]
    postNum: number
    tagNum: number
  }
  const docData = (
    usePluginData('docusaurus-plugin-content-docs') as { versions: { docs: BlogPost[] } }
  )?.versions[0].docs

  const count: Count = {
    blog: blogData.postNum,
    tag: blogData.tagNum ?? 0,
    doc: docData?.length ?? 0,
    project: projects?.length ?? 0,
  }

  return (
    <div className={clsx(isNavbar ? styles.userCardNavbar : styles.userCard)}>
      <Link href="/about">
        <img className={styles.cardImg} src={logoLink} alt="logo"></img>
      </Link>
      <div>
        <Link className={styles.name} href="about">
          {title}
        </Link>
      </div>
      <div className={styles.bio}>{bio}</div>
      <div className={styles.num}>
        <Link className={styles.numItem} href="/blog/archive">
          <Icon icon="carbon:blog" width="20" height="20" />
          {count.blog}
        </Link>
        <Link className={styles.numItem} href="/blog/tags">
          <Icon icon="ri:price-tag-3-line" width="20" height="20" />
          {count.tag}
        </Link>
        <Link className={styles.numItem} href="/docs/skill">
          <Icon icon="carbon:notebook" width="20" height="20" />
          {count.doc}
        </Link>
        <Link className={styles.numItem} href="/project" data-tips="project count">
          <Icon icon="ph:projector-screen" width="20" height="20" />
          {count.project}
        </Link>
      </div>
      <SocialLinks
        style={{
          maxWidth: '100%',
          padding: '0.5em 0',
          justifyContent: 'center',
          gap: '0.5rem',
          ...(isNavbar ? { borderBottom: '1px solid #eee' } : null),
        }}
      />
    </div>
  );
}

const TagsSection = ({ data }: { data: BlogTag[] }) => {
  return (
    <div className="bloginfo__tags">
      {data
        .filter((tag) => tag != null)
        .sort((a, b) => b.items.length - a.items.length)
        .slice(0, 25)
        .map((tag) => (
          <Link
            className={`post__tags note__item margin-right--sm margin-bottom--sm`}
            href={tag.permalink}
            key={tag.permalink}>
            {tag.label}
          </Link>
        ))}
    </div>
  );
};

export default function BlogInfo() {
  const globalData = useGlobalData();
  const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.[
    'default'
  ] as any;
  const blogData = usePluginData('docusaurus-plugin-content-blog') as {
    posts: BlogPost[]
    postNum: number
    tagNum: number
  }
  const docData = (
    usePluginData('docusaurus-plugin-content-docs') as { versions: { docs: BlogPost[] } }
  )?.versions[0].docs
  const tagData = blogPluginData?.tags as BlogTags;

  const count: Count = {
    blog: blogData.postNum,
    tag: blogData.tagNum ?? 0,
    doc: docData?.length ?? 0,
    project: projects?.length ?? 0,
  }

  return (
    <div className="bloginfo col col--3 margin-bottom--md">
      <section className="bloginfo__content">
        <Fade direction='up' triggerOnce={true}>

          <div className="bloghome__posts-card bloginfo__user margin-bottom--md">
            <BlogUser/>
          </div>
          <div className="bloghome__posts-card margin-bottom--md">
            <div className="row bloginfo__card">
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Icon icon="ri:price-tag-3-line" width="25" height="25" />
                <span className="margin-horiz--sm"><strong>标签</strong></span>
              </div>
              <TagsSection data={Object.values(tagData)} />
            </div>
          </div>
        </Fade>

      </section>

    </div>
  );
}
