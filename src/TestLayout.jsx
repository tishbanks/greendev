export default function TestLayout() {
    return (
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: '#fff',
            padding: '2rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#14532d' }}>
            Test de centrage
          </h1>
          <p style={{ color: '#166534' }}>Boîte blanche centrée ?</p>
        </div>
      </div>
    )
  }
  