import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const STARBUCKS_URL = 'https://wogi.gifts/redeem/4YoQcyRJkURUhtS-iMyk6mzm-jyHoWWscZaoD4KCtwoy-VrqBbizKsDi24Beqm8w/activate'
const PASSPHRASE = 'shohei'

const COVER_PROMPT = `本日もお仕事に向かってる
スーパーマンさんへ💪`

const NOTE_LINES = `毎日、遅くまでお仕事頑張っててすごいし尊敬する🫡
あと3回寝たら華金❗️ファイトだ！！You've got this!!
私も勉強がんばるよーー😤`

function TypewriterBlock({
  text,
  started,
  charDelay,
}: {
  text: string
  started: boolean
  charDelay: number
}) {
  const chars = [...text]
  return (
    <p className="whitespace-pre-wrap text-left text-[clamp(0.95rem,2.6vw,1.15rem)] leading-[1.85] tracking-wide text-[#1c1c1c]">
      {chars.map((char, i) =>
        char === '\n' ? (
          <br key={`br-${i}`} />
        ) : (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.02,
              delay: started ? i * charDelay : 0,
            }}
          >
            {char}
          </motion.span>
        ),
      )}
    </p>
  )
}

function LinedPaper({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-black/10 bg-[#faf7f0] shadow-[0_22px_50px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(220, 90, 90, 0.22) 1px, transparent 1px),
          linear-gradient(#d9d4c8 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 1.65rem',
        backgroundPosition: '0 0, 0 1.35rem',
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-3 border-r border-red-300/25 bg-gradient-to-r from-red-100/20 to-transparent" />
      <div className="relative px-5 pb-6 pt-7 pl-9">{children}</div>
    </div>
  )
}

function AuthScreen({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const tryAuth = useCallback(() => {
    if (value.trim() === PASSPHRASE) {
      setError(false)
      onSuccess()
      return
    }
    setError(true)
  }, [value, onSuccess])

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      tryAuth()
    },
    [tryAuth],
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[var(--app-page-bg)] px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-label"
    >
      <img
        src="/auth-key-bg.png"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 m-auto h-full max-h-[100dvh] w-full max-w-[min(100vw,720px)] object-contain object-top pt-[max(2vh,16px)]"
      />

      <form
        onSubmit={onSubmit}
        className="relative z-10 mt-[min(50vh,400px)] flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-neutral-200/90 bg-white/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm"
      >
        <label
          id="auth-label"
          htmlFor="passphrase"
          className="text-left text-sm font-medium leading-snug text-neutral-800"
        >
          Put your first name here in English (Lowercase)
        </label>
        <input
          ref={inputRef}
          id="passphrase"
          name="passphrase"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base text-neutral-900 outline-none ring-sky-400/40 transition focus:border-sky-400 focus:ring-2"
          aria-invalid={error}
          aria-describedby={error ? 'auth-error' : undefined}
        />
        {error && (
          <p id="auth-error" className="text-sm text-red-600" role="alert">
            合言葉が正しくありません。
          </p>
        )}
        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          進む
        </button>
      </form>
    </div>
  )
}

function GlassFuelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 w-full max-w-[min(92vw,280px)] cursor-pointer rounded-full border border-white/75 bg-white/40 px-9 py-3.5 text-center text-[0.92rem] font-semibold tracking-[0.06em] text-neutral-800 backdrop-blur-xl transition hover:bg-white/52 hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/60 active:scale-[0.98] md:self-start"
      style={{
        boxShadow: `
          0 20px 48px rgba(0, 0, 0, 0.11),
          0 4px 12px rgba(0, 0, 0, 0.06),
          inset 0 2px 4px rgba(255, 255, 255, 0.92),
          inset 0 -3px 6px rgba(255, 255, 255, 0.38)
        `,
      }}
    >
      Fuel for you
    </button>
  )
}

function GiftPage({
  reduceMotion,
}: {
  reduceMotion: boolean
}) {
  const [navigating, setNavigating] = useState(false)

  const handleOpen = useCallback(() => {
    if (navigating) return
    setNavigating(true)
    window.location.assign(STARBUCKS_URL)
  }, [navigating])

  return (
    <motion.div
      role="presentation"
      className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center px-6"
      style={{ backgroundColor: 'var(--app-page-bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.4 }}
    >
      <button
        type="button"
        aria-label="プレゼントを開いてスターバックス公式サイトへ"
        disabled={navigating}
        onClick={handleOpen}
        className="flex touch-manipulation flex-col items-center border-0 bg-transparent p-4 disabled:opacity-70"
      >
        <img
          src="/gift-box.png"
          alt=""
          className="h-auto max-h-[min(52vh,420px)] w-auto max-w-[min(85vw,340px)] select-none bg-[var(--app-page-bg)] object-contain"
        />
      </button>
    </motion.div>
  )
}

function NoteMessage({ onOpenGift }: { onOpenGift: () => void }) {
  const reduceMotion = useReducedMotion()
  const charDelay = reduceMotion ? 0 : 0.028

  return (
    <div className="relative flex max-w-[min(92vw,28rem)] flex-col items-stretch">
      <LinedPaper>
        <TypewriterBlock
          text={NOTE_LINES}
          started
          charDelay={charDelay}
        />
      </LinedPaper>
      <GlassFuelButton onClick={onOpenGift} />
    </div>
  )
}

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [open, setOpen] = useState(false)
  const [innerPage, setInnerPage] = useState<'note' | 'gift'>('note')
  const reduceMotion = useReducedMotion()

  const openSite = useCallback(() => {
    setInnerPage('note')
    setOpen(true)
  }, [])

  const onKeyCover = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openSite()
      }
    },
    [openSite],
  )

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ fontFamily: "'Klee One', ui-sans-serif, system-ui, sans-serif" }}
    >
      {!authed && <AuthScreen onSuccess={() => setAuthed(true)} />}

      <AnimatePresence mode="wait">
        {authed && !open && (
          <motion.button
            type="button"
            key="cover"
            aria-label="メッセージを開く"
            className="fixed inset-0 z-40 flex min-h-[100dvh] w-full cursor-pointer flex-col items-start justify-end gap-6 border-0 pl-0 pr-5 pb-6 pt-14 text-left sm:pr-8 md:flex-row md:items-end md:justify-start md:gap-10 md:pr-14 md:pb-8 md:pt-16"
            style={{
              backgroundColor: 'var(--app-page-bg)',
            }}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: reduceMotion ? 1 : 1.02,
              filter: reduceMotion ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.4, 0, 0.2, 1] }}
            onClick={openSite}
            onKeyDown={onKeyCover}
          >
            <div className="pointer-events-none flex w-full max-w-none flex-col items-start gap-6 md:flex-row md:items-end md:gap-10 lg:gap-14">
              <motion.div
                className="relative shrink-0 self-start md:self-end"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative leading-none">
                  <img
                    src="/cover-hero.png"
                    alt="ノートPCを打つ大理石の像"
                    className="block h-auto max-h-[min(50vh,400px)] w-auto max-w-[min(72vw,300px)] object-contain object-left-bottom md:max-h-[min(62vh,520px)] md:max-w-[min(42vw,380px)]"
                  />
                </div>
              </motion.div>

              <motion.div
                className="max-w-md flex-1 text-left md:min-w-0 md:pb-2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily:
                    '"HGP創英角ポップ体", "HGP 創英角ポップ体", "HG創英角ポップ体", "Klee One", ui-sans-serif, system-ui, sans-serif',
                }}
              >
                <div className="relative inline-block rounded-2xl border border-neutral-200/90 bg-neutral-50/95 px-5 py-4 shadow-[0_10px_36px_rgba(0,0,0,0.08)] md:px-6 md:py-5">
                  <div className="absolute -left-1 top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-neutral-200/90 bg-neutral-50 md:block" />
                  <p className="whitespace-pre-wrap text-[clamp(1.05rem,3.2vw,1.55rem)] font-semibold leading-snug tracking-wide text-neutral-900">
                    {COVER_PROMPT}
                  </p>
                </div>
                <p className="mt-4 text-xs tracking-[0.2em] text-neutral-400">
                  TAP ANYWHERE
                </p>
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {authed && open && innerPage === 'note' && (
          <motion.div
            key="scene-note"
            role="presentation"
            className="relative min-h-[100dvh]"
            style={{ backgroundColor: 'var(--app-page-bg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35 }}
          >
            <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end gap-6 px-4 pb-8 pt-16 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10 md:pt-10">
              <motion.img
                src="/presenter.png"
                alt="親指を立てて応援する大理石の像"
                className="pointer-events-none relative z-20 max-h-[min(64vh,540px)] w-auto max-w-[min(78vw,420px)] select-none object-contain md:max-h-[min(68vh,580px)] md:max-w-[min(48vw,460px)]"
                style={{ backgroundColor: 'var(--app-page-bg)' }}
                initial={{ opacity: 0, x: -36, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.2 }
                    : { type: 'spring', stiffness: 200, damping: 26, delay: 0.08 }
                }
              />

              <div className="relative z-30 flex min-w-0 w-full flex-1 items-end justify-center pb-2 md:max-w-none md:justify-start md:pl-4 md:pb-6">
                <NoteMessage onOpenGift={() => setInnerPage('gift')} />
              </div>
            </div>
          </motion.div>
        )}
        {authed && open && innerPage === 'gift' && (
          <GiftPage key="scene-gift" reduceMotion={!!reduceMotion} />
        )}
      </AnimatePresence>
    </div>
  )
}
