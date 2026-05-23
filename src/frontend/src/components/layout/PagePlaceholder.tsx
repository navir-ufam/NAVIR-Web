type PagePlaceholderProps = Readonly<{
  title: string;
  description?: string;
}>;

function PagePlaceholder({
  title,
  description = "Placeholder inicial para a pagina.",
}: PagePlaceholderProps) {
  return (
    <section className="page-placeholder">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default PagePlaceholder;
