import Item from "./Item/Item";

export default function Portfolio(props) {
  return (
    <div>
      {/* <!-- Portfolio--> */}
      <section className="content-section" id="portfolio">
        <div className="container px-4 px-lg-5">
          <div className="content-section-heading text-center">
            <h3 className="text-secondary mb-0">{props.main_title}</h3>
            <h2 className="mb-5">{props.title}</h2>
          </div>
          <div className="row gx-0">
            <Item
              href="#instagram"
              caption_title="Instagram"
              caption_description="Instagram Scraper"
              img_source="assets/img/portfolio/instagram.jpg"
            />
            <Item
              href="/spotify"
              caption_title="Spotify"
              caption_description="Spotify Playlist Download"
              img_source="assets/img/portfolio/spotify.jpg"
            />
            <Item
              href="http://agro-crm-project.herokuapp.com"
              caption_title="Agro CRM"
              caption_description="A Customer Relationship Management app!"
              img_source="assets/img/portfolio/crm_img.jpg"
            />

            <Item
              href="http://turnosyagenda.herokuapp.com"
              caption_title="Turnero"
              caption_description="Booking services made easy!"
              img_source="assets/img/portfolio/turnero_img.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
