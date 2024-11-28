export function splitWord(string: string) {
  return string
    .split(/[^a-zA-Z0-9$]+/)
    .map((item) => item.split(/([A-Z][^A-Z]+)/))
    .flat()
    .filter(Boolean)
}

export function kebabCase(string: string) {
  return splitWord(string)
    .map((item) => item.toLowerCase())
    .join('-')
}

export function setSvgBaseProps(svg: SVGElement) {
  svg.setAttribute('width', '1em')
  svg.setAttribute('height', '1em')
  svg.setAttribute('fill', 'currentColor')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
}

export function toArray(target: unknown) {
  return Array.isArray(target) ? target : [target]
}
