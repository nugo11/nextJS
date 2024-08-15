import AddMovie from "@/componenets/addMovie";

export default function HomePage() {
  return (
    <div className="detail-container">
      <section className="section section--details">
        <div className="content__head content__head--mt">
          <div className="section section--catalog">
            <div className="container">
              <div
                className="row"
                style={{
                  height: 500,
                  display: "grid",
                  placeItems: "center",
                  overflowY: "scroll",
                }}
              >
                <AddMovie />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
