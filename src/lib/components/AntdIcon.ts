import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import type {
  AbstractNode,
  IconDefinition,
} from '@ant-design/icons-svg/lib/types'
import { blue } from '@ant-design/colors'
import {
  getSecondaryColor,
  setTwoToneColor,
  TwoToneColorPalette,
  twoToneColorPalette,
} from '../helpers/twoToneColor'
import { anticonStyle } from './style/anticon'
import { setSvgBaseProps } from '../helpers/utils'

setTwoToneColor(blue.primary!)

export abstract class AntdIcon extends LitElement {
  static styles = anticonStyle

  iconDefinition!: IconDefinition

  @property()
  primary?: string

  @property()
  secondary?: string

  @property({ type: Boolean })
  spin?: boolean

  @property({ type: Number })
  rotate?: number

  private get colors() {
    let colors = twoToneColorPalette

    if (this.primary) {
      colors = {
        primary: this.primary,
        secondary: this.secondary || getSecondaryColor(this.primary),
      }
    }
    return colors
  }

  protected generateSvg(colors: TwoToneColorPalette) {
    const { icon, name } = this.iconDefinition

    const node =
      typeof icon === 'function'
        ? icon(colors.primary, colors.secondary!)
        : icon

    const svg = this.generate(node)
    this.initialSvg(svg, name)
    return svg
  }

  protected initialSvg(svg: SVGElement, name: string) {
    setSvgBaseProps(svg)
    svg.setAttribute('data-icon', name)
  }

  protected generate(node: AbstractNode) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      node.tag,
    )
    Object.entries(node.attrs).forEach(([prop, value]) => {
      if (value) {
        element.setAttribute(prop, value)
      }
    })
    if (node.children) {
      node.children.forEach((subNode) => {
        element.appendChild(this.generate(subNode))
      })
    }
    return element
  }

  render() {
    const prefixCls = 'anticon'
    const { name } = this.iconDefinition

    const svg = this.generateSvg(this.colors)

    return html`
      <span
        role="img"
        aria-label=${name}
        class=${classMap({
          [prefixCls]: true,
          [`${prefixCls}-${name}`]: !!name,
          [`${prefixCls}-spin`]: !!this.spin || name === 'loading',
        })}
        style=${styleMap({
          transform: this.rotate ? `rotate(${this.rotate}deg)` : null,
        })}
      >
        ${svg}
      </span>
    `
  }
}

export default AntdIcon
