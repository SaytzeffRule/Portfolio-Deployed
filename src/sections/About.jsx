function About() {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-900/50">
      <div className="section-container">
        <h2 className="section-title">
          <span className="font-mono text-sm text-primary-600 dark:text-primary-500">01. </span>
          About Me
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="prose prose-gray max-w-none dark:prose-invert md:col-span-2">
            <p className="text-gray-600 dark:text-gray-400">
              I'm an AI Engineer and Full-Stack Developer passionate about building intelligent
              systems that solve real-world problems. My work spans LLM-powered applications,
              multi-agent systems, and cloud-native infrastructure.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              I specialize in bridging the gap between AI research and production engineering —
              from deploying RAG-based tutoring platforms to building multi-agent negotiation
              arenas. I'm always exploring new ways to combine modern web stacks with cutting-edge AI.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
              {/* TODO: replace with your profile photo. Recommended: upload to S3 and
                  reference via VITE_PROFILE_IMG_URL env var or hardcode the S3 URL here. */}
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Photo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
