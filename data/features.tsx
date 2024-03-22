import OpenSourceSvg from '@site/static/svg/undraw_open-source.svg'
import StduySvg from '@site/static/svg/undraw_study.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.freshman',
      message: '正在转码的小白',
    }),
    text: (
      <Translate>
        从土木转码，现在正在努力自学ing，希望能和更多的大佬进行交流
      </Translate>
    ),
    Svg: StduySvg,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '开源爱好者',
    }),
    text: (
      <Translate>
        作为一名开源爱好者，希望有生之年能够构建出一个知名的开源项目。
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
