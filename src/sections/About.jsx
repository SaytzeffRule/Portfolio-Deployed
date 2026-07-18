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
              {/* TODO: replace with your bio - 2-3 paragraphs about your background,
                  what you do, what you're passionate about, etc. */}
              I'm a passionate software engineer with experience building modern web
              applications and distributed systems. I enjoy solving complex problems
              and delivering clean, maintainable code.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Currently focused on full-stack development with React, Node.js, and
              cloud-native technologies. When I'm not coding, you'll find me
              exploring new tools and contributing to open-source projects.
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
