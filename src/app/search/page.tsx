export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";

  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh", paddingTop: 140, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <h1 style={{ color: "#D4AF37", fontFamily: "serif", fontSize: "2rem" }}>
          Search Results for: {q}
        </h1>
      </div>
    </div>
  );
}