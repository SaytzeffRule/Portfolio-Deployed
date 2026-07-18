function Resume() {
  // TODO: Upload your resume PDF to S3 and set the VITE_RESUME_URL env var,
  // or replace the URL below directly with your S3 object URL.
  const resumeUrl = import.meta.env.VITE_RESUME_URL || '#';

  return (
    <section id="resume" className="scroll-mt-20">
      <div className="section-container text-center">
        <h2 className="section-title">
          <span className="font-mono text-sm text-primary-600 dark:text-primary-500">04. </span>
          Resume
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-gray-600 dark:text-gray-400">
          {/* TODO: replace with your own text */}
          Want to learn more about my experience and background? Download my resume below.
        </p>
        <a
          href={resumeUrl}
          download
          className="btn-primary"
          {...(resumeUrl === '#' ? { onClick: (e) => e.preventDefault(), title: 'TODO: set VITE_RESUME_URL or replace the URL in the code' } : {})}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume (PDF)
        </a>
      </div>
    </section>
  );
}

export default Resume;
