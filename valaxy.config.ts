import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
<<<<<<< HEAD
import { addonTwikoo } from 'valaxy-addon-twikoo'

=======
// import { addonWaline } from 'valaxy-addon-w
import { addonTwikoo } from 'valaxy-addon-twikoo'


>>>>>>> 303165339c272eb1061b0fb35b127283da98c4ea
// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '愿再见时已是晴天',
    },

    // pages: [
    //   {
    //     name: '我的小伙伴们',
    //     url: '/links/',
    //     icon: 'i-ri-genderless-line',
    //     color: 'dodgerblue',
    //   },
    //   {
    //     name: '喜欢的女孩子',
    //     url: '/girls/',
    //     icon: 'i-ri-women-line',
    //     color: 'hotpink',
    //   },
    // ],

    // footer: {
    //   since: 2024,
    //   beian: {
    //     enable: false,
    //     icp: '苏ICP备17038157号',
    //   },
    // },
    
    bg_image: {
      enable: true,
      url: 'https://s21.ax1x.com/2025/07/20/pV8m76g.jpg',
      dark: 'https://s21.ax1x.com/2025/07/23/pVGdu4K.jpg',
      opacity: 0.7, 
    },

    /**
   * [@explosions/fireworks](https://www.npmjs.com/package/@explosions/fireworks)
   * @en - Fireworks when click
   * @zh - 点击时的烟花效果
   */
  fireworks: {
    enable: true,
    /**
     * @en - Fireworks colors
     * @zh - 烟花颜色
     * @default ['#66A7DD', '#3E83E1', '#214EC2']
     */
    colors: ['#66A7DD', '#3E83E1', '#214EC2']
  }
  },

  unocss: { safelist },

  siteConfig: {
    comment: {
      enable: true,
    },
  },
  addons: [
    addonTwikoo({envId: 'https://smallaw-twikoo.netlify.app/.netlify/functions/twikoo',}),
  ],
  // 设置 valaxy-addon-waline 配置项
  // addons: [
  //   addonWaline({
  //     // Waline 配置项，参考 https://waline.js.org/reference/client/props.html
  //     serverURL: 'https://hexo-page-waline.vercel.app/',
  //     dark: 'auto',
  //   }),
  // ],
})
