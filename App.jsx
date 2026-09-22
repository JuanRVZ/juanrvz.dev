export default function App() {
  return (
    <div className="flex min-h-svh flex-col bg-[#101412] px-6 text-[#f0f1e9] sm:px-12">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-white/10 py-7">
        <span className="font-mono text-sm tracking-widest">JRV.</span>
        <span className="font-mono text-xs text-[#a2aca4]">SOFTWARE DEVELOPER</span>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-24">
        <p className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-[#c2e99b]">
          <span className="h-2 w-2 rounded-full bg-[#c2e99b]" aria-hidden="true" />
          PORTFOLIO COMING SOON
        </p>
        <h1 className="max-w-4xl text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl lg:text-8xl">
          Juan Ramón<br />Vaz León<span className="text-[#c2e99b]">.</span>
        </h1>
        <p className="mt-8 text-xl text-[#a2aca4] sm:text-2xl">Software Developer</p>
      </main>
      <footer className="mx-auto w-full max-w-6xl border-t border-white/10 py-6 font-mono text-xs text-[#a2aca4]">
        Juan Ramón Vaz León
      </footer>
    </div>
  )
}
