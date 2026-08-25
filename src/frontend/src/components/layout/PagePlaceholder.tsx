type PagePlaceholderProps = {
  title: string
  description?: string
}

export function PagePlaceholder({
  title,
  description = 'Placeholder inicial para a pagina.',
}: PagePlaceholderProps) {
  return (
    <section className="page-placeholder">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export default PagePlaceholder
