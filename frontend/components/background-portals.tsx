"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Portal {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export default function BackgroundPortals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

   
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // portais
    const portals: Portal[] = []
    const portalCount = Math.min(15, Math.floor(window.innerWidth / 100))

    for (let i = 0; i < portalCount; i++) {
      portals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Thema
      const portalColor = theme === "dark" ? "rgba(68, 255, 178, " : "rgba(68, 255, 178, "

      // Desenhar portais
      portals.forEach((portal) => {
        ctx.beginPath()
        ctx.arc(portal.x, portal.y, portal.size, 0, Math.PI * 2)
        ctx.fillStyle = `${portalColor}${portal.opacity})`
        ctx.fill()

        // Adicionar glow
        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(68, 255, 178, 0.5)"

        // Mover portal
        portal.y += portal.speed

        // Reposicionar portal quando sair da tela
        if (portal.y > canvas.height + portal.size) {
          portal.y = -portal.size
          portal.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}
