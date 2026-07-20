const PROJECTS = [
  {
    title: 'Email Classification & Summarization',
    description:
      'AI-powered system for intelligent email classification and prioritization. Utilizes LLMs to summarize threads and highlight actionable tasks, leveraging vector databases to provide context-aware summarization and task extraction.',
    tech: ['LLMs', 'Vector DB', 'Python', 'Hugging Face'],
    links: {
      github: 'https://huggingface.co/spaces/abhinavgautam01/my-env',
      live: 'https://huggingface.co/spaces/abhinavgautam01/my-env',
    },
  },
  {
    title: 'GPU Budget Negotiation Arena',
    description:
      'An interactive multi-agent negotiation platform where AI agents bargain for limited GPU resources under budget constraints. Developed using LLMs to simulate complex trade-offs and resource allocation strategies while evaluating agent performance through custom evaluation metrics.',
    tech: ['LLMs', 'Multi-Agent', 'Python', 'Hugging Face'],
    links: {
      github: 'https://huggingface.co/spaces/abhinavgautam01/gpu-budget-negotiation-arena',
      live: 'https://huggingface.co/spaces/abhinavgautam01/gpu-budget-negotiation-arena',
    },
  },
  {
    title: 'Socratic AI',
    description:
      'AI-powered learning platform facilitating inquiry-based interaction and deep conceptual understanding using modern web stacks. Employs Retrieval-Augmented Generation (RAG) to offer personalized tutoring and context-driven feedback.',
    tech: ['RAG', 'Next.js', 'TypeScript', 'AI'],
    links: {
      github: 'https://socratic-ai-web-one.vercel.app/',
      live: 'https://socratic-ai-web-one.vercel.app/',
    },
  },
];

function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="section-container">
        <h2 className="section-title">
          <span className="font-mono text-sm text-primary-600 dark:text-primary-500">02. </span>
          Projects
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article key={project.title} className="card group flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                  </svg>
                </div>
                <div className="flex gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
