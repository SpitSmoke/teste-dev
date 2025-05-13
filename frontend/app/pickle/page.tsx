'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'

const PICKLE_QUOTES = [
  "I turned myself into a pickle, Morty! I'm Pickle Rick!",
  "I'm not just any pickle, Morty. I'm Pickle Riiiick!",
  "The reason anyone would do this is, if they could, which they can't, would be because they could, which they can't.",
  "I've got no reason to help you! All you want to do is control me!",
  "I'm a pickle. What do you think I'm trying to say? I turned myself into a pickle. What more do you want?",
  "I'm Pickle Riiiiiiiick!",
  "I'm pickle Rick, baby!",
  'Pickle Rick, baby! Wubba lubba dub dub!',
  "I've been turned into a pickle, Morty! I'm Pickle Riiiiick!",
]

const CLICK_THRESHOLDS = {
  VOICE: 5,
  GAME: 10,
  ULTIMATE: 20,
}

export default function PicklePage() {
  const { toast } = useToast()
  const [clickCount, setClickCount] = useState(0)
  const [showGame, setShowGame] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [showUltimatePickle, setShowUltimatePickle] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(PICKLE_QUOTES[0])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [gameTime, setGameTime] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [picklePosition, setPicklePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    document.body.classList.add('pickle-mode')

    toast({
      title: 'Pickle Rick Mode Activated!',
      description: 'I turned myself into a pickle, Morty!',
      duration: 5000,
    })

    const visitCount =
      Number.parseInt(localStorage.getItem('pickleVisits') || '0') + 1
    localStorage.setItem('pickleVisits', visitCount.toString())

    if (visitCount > 1) {
      toast({
        title: `Você já visitou o Pickle Rick ${visitCount} vezes!`,
        description:
          visitCount >= 5
            ? 'Você realmente gosta de pepinos, hein?'
            : 'Continue voltando para mais surpresas!',
        duration: 3000,
      })
    }

    const audio = new Audio('/getSchwifty.mp3')
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true)
    })

    audio.load()

    return () => {
      document.body.classList.remove('pickle-mode')
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [toast])

  const toggleAudio = () => {
    try {
      if (!audioRef.current || !audioLoaded) {
        console.warn('Áudio não está pronto ainda')
        toast({
          title: 'Ops!',
          description:
            'O áudio está carregando, tente novamente em alguns segundos.',
          duration: 3000,
        })
        return
      }

      if (!audioEnabled) {
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setAudioEnabled(true)
            })
            .catch((error) => {
              console.error('Erro ao reproduzir áudio:', error)
              toast({
                title: 'Erro ao reproduzir áudio',
                description:
                  'Seu navegador pode estar bloqueando a reprodução automática.',
                duration: 3000,
              })
            })
        }
      } else {
        audioRef.current.pause()
        setAudioEnabled(false)
      }
    } catch (error) {
      console.error('Erro no toggleAudio:', error)
      toast({
        title: 'Erro ao controlar áudio',
        description: 'Ocorreu um problema ao tentar controlar o áudio.',
        duration: 3000,
      })
    }
  }

  const handlePickleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    setCurrentQuote(
      PICKLE_QUOTES[Math.floor(Math.random() * PICKLE_QUOTES.length)]
    )

    if (newCount === CLICK_THRESHOLDS.VOICE) {
      toast({
        title: 'Você desbloqueou a voz do Pickle Rick!',
        description: 'Agora você pode ouvir o Pickle Rick!',
        duration: 3000,
      })

      if (audioRef.current && audioLoaded) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setAudioEnabled(true)
            })
            .catch((e) => {
              console.warn(
                'Não foi possível reproduzir áudio automaticamente:',
                e
              )
            })
        }
      }
    } else if (newCount === CLICK_THRESHOLDS.GAME) {
      toast({
        title: 'Você desbloqueou o mini-game do Pickle Rick!',
        description: "Clique em 'Jogar' para iniciar!",
        duration: 3000,
      })
      setShowGame(true)
    } else if (newCount === CLICK_THRESHOLDS.ULTIMATE) {
      toast({
        title: 'ULTIMATE PICKLE UNLOCKED!',
        description: 'Você é o verdadeiro fã de Pickle Rick!',
        duration: 5000,
      })
      setShowUltimatePickle(true)
    }
  }

  const startGame = () => {
    setGameActive(true)
    setGameScore(0)
    setGameTime(30)

    movePickleRandomly()

    gameTimerRef.current = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          if (gameTimerRef.current) {
            clearInterval(gameTimerRef.current)
          }
          setGameActive(false)
          toast({
            title: 'Fim de jogo!',
            description: `Você conseguiu ${gameScore} pontos!`,
            duration: 5000,
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const movePickleRandomly = () => {
    setPicklePosition({
      x: Math.random() * 80 + 10, // 10% a 90% da largura
      y: Math.random() * 80 + 10, // 10% a 90% da altura
    })
  }

  const catchPickle = () => {
    setGameScore((prev) => prev + 1)
    movePickleRandomly()
  }

  return (
    <main className="container mx-auto px-4 py-16 text-center relative min-h-[80vh]">
      {/* Botão de áudio */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAudio}
          className={`${audioEnabled ? 'bg-green-600 text-white' : ''}`}
          disabled={!audioLoaded}
        >
          {audioEnabled ? <Volume2 /> : <VolumeX />}
        </Button>
      </div>

      {/* Contador de cliques */}
      <div className="absolute top-4 left-4 text-xs text-muted-foreground">
        Pickle Power: {clickCount}
      </div>

      {/* Pickle Rick principal */}
      {!showGame && !showUltimatePickle && (
        <>
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 10, scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
            className="mb-8 inline-block cursor-pointer"
            onClick={handlePickleClick}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src="/pickle_rick.png"
              alt="Pickle Rick"
              width={300}
              height={400}
              className="mx-auto"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            I&apos;m Pickle Rick!
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            {currentQuote}
          </motion.p>
        </>
      )}

      {/* Mini-game do Pickle Rick */}
      {showGame && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Pickle Rick Game</h2>

          {!gameActive ? (
            <div className="mb-6">
              <p className="mb-4">
                Clique no Pickle Rick o máximo de vezes que conseguir em 30
                segundos!
              </p>
              <Button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700"
              >
                Jogar!
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-4 max-w-md mx-auto">
                <div className="text-xl font-bold">Pontos: {gameScore}</div>
                <div className="text-xl font-bold">Tempo: {gameTime}s</div>
              </div>

              <div className="relative w-full h-[400px] border-2 border-dashed border-green-500 rounded-lg mb-6 overflow-hidden bg-black/20">
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    left: `${picklePosition.x}%`,
                    top: `${picklePosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                  onClick={catchPickle}
                >
                  <Image
                    src="/pickle_rick.png"
                    alt="Catch Pickle Rick"
                    width={80}
                    height={120}
                    className="pointer-events-none"
                  />
                </motion.div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Ultimate Pickle */}
      {showUltimatePickle && (
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.1, rotate: 0 }}
            animate={{ scale: 1, rotate: 720 }}
            transition={{ duration: 1.5, type: 'spring' }}
            className="relative mb-8 inline-block"
          >
            <Image
              src="/pickle-rick.png"
              alt="Ultimate Pickle Rick"
              width={400}
              height={500}
              className="mx-auto"
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px 10px rgba(68, 255, 178, 0.7)',
                  '0 0 40px 20px rgba(68, 255, 178, 0.9)',
                  '0 0 20px 10px rgba(68, 255, 178, 0.7)',
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -inset-4"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-120px)`,
                  }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-green-500"
          >
            ULTIMATE PICKLE RICK!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl mb-8 max-w-2xl mx-auto"
          >
            Você é o verdadeiro mestre do multiverso!
          </motion.p>
        </div>
      )}

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link href="/">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Voltar ao Portal Normal
          </Button>
        </Link>
      </motion.div>
    </main>
  )
}
