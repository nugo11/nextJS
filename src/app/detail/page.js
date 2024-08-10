export default async function detailPage({ searchParams }) {
  return (
    <div className="detail-container">
    <section className="section section--details" style={{ marginTop: 0, height: 700, display: 'grid', placeItems: 'center' }}>
      <div className="content__head content__head--mt">
    <div className="section section--catalog">
      <div className="container">
        <div className="row">
          <p style={{ color: "white", textAlign: 'center', fontSize: 30 }}>გვერდი ვერ მოიძებნა</p>
        </div>
      </div>
    </div>
    </div>
    </section>
    </div>
  );
}
