function Hero() {
  return (
    <section id="hero" className="flex min-h-screen items-center justify-center">
      <div className="section-container text-center">
        <p className="mb-4 font-mono text-sm text-primary-600 dark:text-primary-500">
          Hi, my name is
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
          {/* TODO: replace with your name */}
          Your Name
        </h1>
        <h2 className="mb-6 text-2xl font-medium text-gray-500 dark:text-gray-400 sm:text-3xl">
          {/* TODO: replace with your title */}
          Full-Stack Developer &amp; DevOps Engineer
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-gray-600 dark:text-gray-400">
          {/* TODO: write a 1-2 sentence tagline about yourself */}
          I build scalable applications and robust infrastructure.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-primary">
            View My Work
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
