import { Injectable } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

export interface SEONode {
  title?: string
  description?: string
  imgUrl?: string
  type?: string
  url?: string
  locale?: string
  facebookAppId?: string
}

@Injectable()
export class SEOService {
  constructor(private title: Title, private meta: Meta) { }

  updateNode(node: SEONode) {
    if (node.title) this.updateTitle(node.title)
    if (node.description) this.updateDescription(node.description)
    if (node.imgUrl) this.updateImg(node.imgUrl)
    if (node.title) this.updateType(node.type)
    if (node.url) this.updateUrl(node.url)
    if (node.title) this.updateLocale(node.locale)
    if (node.facebookAppId) this.updateFbAppId(node.facebookAppId)
  }

  updateTitle(title: string) {
    this.title.setTitle(title)
    this.meta.updateTag(this.createOgTag('title', title))
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
    this.meta.updateTag(this.createOgTag('description', desc))
  }

  updateFbAppId(id: string) {
    this.meta.updateTag({ property: 'fb:app_id', content: id })
  }

  updateImg(imgUrl: string) {
    this.meta.updateTag(this.createOgTag('image', imgUrl))
  }

  updateType(type = 'website') {
    this.meta.updateTag(this.createOgTag('type', type))
  }

  updateLocale(locale = 'en_US') {
    this.meta.updateTag(this.createOgTag('locale', locale))
  }

  updateUrl(url: string) {
    this.meta.updateTag(this.createOgTag('url', url))
  }

  createOgTag(property: string, content: string) {
    return {
      property: `og:${property}`,
      content
    }
  }
}
