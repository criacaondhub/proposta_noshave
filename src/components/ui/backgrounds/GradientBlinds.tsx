import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/*
 * Cortina de luz em WebGL — mesmo efeito dos fundos da proposta FUE Ultramar
 * (faixas verticais + granulado + holofote que atravessa a tela em diagonal),
 * recolorido com o azul do No Shave Experience.
 */

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT = `
precision mediump float;

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uShineFlip;
uniform vec3  uColor0;
uniform vec3  uColor1;

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  vec2 uv0 = fragCoord / iResolution.xy;

  float aspect = iResolution.x / iResolution.y;
  vec2 p = uv0 * 2.0 - 1.0;
  p.x *= aspect;
  vec2 pr = rotate2D(p, uAngle);
  pr.x /= aspect;
  vec2 uv = pr * 0.5 + 0.5;

  vec3 base = mix(uColor0, uColor1, clamp(uv.x, 0.0, 1.0));

  vec2 offset = iMouse / iResolution.xy;
  float dn = length(uv0 - offset) / max(uSpotlightRadius, 1e-4);
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;

  float blindCount = max(uBlindCount, 1.0);
  float stripe = fract(uv.x * blindCount);
  float stripeAA = clamp(blindCount * 1.25 / min(iResolution.x, iResolution.y), 0.001, 0.12);
  float edgeBlend = 1.0 - smoothstep(0.0, stripeAA, min(stripe, 1.0 - stripe));
  stripe = mix(stripe, 0.5, edgeBlend);
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;

  vec3 col = vec3(spot) + base - vec3(stripe);
  col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
  gl_FragColor = vec4(col, 1.0);
}
`

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as [number, number, number]
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export interface GradientBlindsProps {
  /** 1 ou 2 cores (gradiente da esquerda para a direita) */
  colors: [string] | [string, string]
  angle?: number
  noise?: number
  blindCount?: number
  /** largura mínima de cada faixa: em telas estreitas a contagem cai */
  blindMinWidth?: number
  spotlightRadius?: number
  spotlightSoftness?: number
  spotlightOpacity?: number
  shineDirection?: 'left' | 'right'
  /** cria o contexto WebGL (só o slide atual e os vizinhos) */
  mounted?: boolean
  /** anima o holofote e o granulado (só o slide atual) */
  playing?: boolean
}

export function GradientBlinds({
  colors,
  angle = 0,
  noise = 0.3,
  blindCount = 28,
  blindMinWidth = 22,
  spotlightRadius = 0.35,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  shineDirection = 'left',
  mounted = true,
  playing = true,
}: GradientBlindsProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const animate = playing && !reduceMotion
  const [color0, color1 = color0] = colors

  useEffect(() => {
    const host = hostRef.current
    if (!host || !mounted) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'display:block;width:100%;height:100%'
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
    if (!gl) return
    host.appendChild(canvas)

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    gl.useProgram(program)

    // triângulo que cobre a tela inteira
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    gl.uniform1f(u('uAngle'), (angle * Math.PI) / 180)
    gl.uniform1f(u('uNoise'), noise)
    gl.uniform1f(u('uSpotlightRadius'), spotlightRadius)
    gl.uniform1f(u('uSpotlightSoftness'), spotlightSoftness)
    gl.uniform1f(u('uSpotlightOpacity'), spotlightOpacity)
    gl.uniform1f(u('uShineFlip'), shineDirection === 'right' ? 1 : 0)
    gl.uniform3fv(u('uColor0'), hexToRgb(color0))
    gl.uniform3fv(u('uColor1'), hexToRgb(color1))
    const uResolution = u('iResolution')
    const uMouse = u('iMouse')
    const uTime = u('iTime')
    const uBlindCount = u('uBlindCount')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = 1
    let height = 1
    let frame = 0

    const draw = (now: number) => {
      const t = now * 0.001
      // holofote passeando na diagonal, como na referência
      const s = Math.sin(t * 0.28) * 0.5 + 0.5
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, width * (0.18 + s * 0.64), height * (0.18 + s * 0.64))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = (now: number) => {
      draw(now)
      frame = requestAnimationFrame(loop)
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform3f(uResolution, width, height, 1)
      const byWidth = Math.max(1, Math.floor(rect.width / blindMinWidth))
      gl.uniform1f(uBlindCount, Math.min(blindCount, byWidth))
      if (!animate) draw(4000)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    resize()
    if (animate) frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    }
  }, [
    mounted,
    animate,
    color0,
    color1,
    angle,
    noise,
    blindCount,
    blindMinWidth,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    shineDirection,
  ])

  return <div ref={hostRef} aria-hidden className="h-full w-full overflow-hidden mix-blend-lighten" />
}
