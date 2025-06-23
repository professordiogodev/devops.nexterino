// Server Component, so it can read process.env at request time
export default function Home() {
  const desiredPath = process.env.DESIRED_PATH || '/';
  const number      = process.env.NUMBER       || 0;

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>Hello from {desiredPath} number {number}!</h1>
    </main>
  );
}
