<script lang="ts">
  export let name: string;
</script>

<main>
  <section class="py-3 text-center container">
    <div class="row py-lg-3">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1>{name}</h1>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row">
        <div class="col">
          <div
            class="btn-toolbar justify-content-between"
            role="toolbar"
            aria-label="Date area select buttons"
          >
            <div class="btn-group" role="group" aria-label="Date area">
              <button type="button" class="btn btn-outline-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </button>
              <button type="button" class="btn btn-outline-secondary active"
                >heute</button
              >
              <button type="button" class="btn btn-outline-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>

            <div class="date-display">
              <h5>KW 25 (18. - 24. Juni 2023)</h5>
            </div>

            <div
              class="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <button type="button" class="btn btn-outline-secondary active">Woche</button>
              <button type="button" class="btn btn-outline-secondary">Monat</button>
              <button type="button" class="btn btn-outline-secondary">Jahr</button>
              <button type="button" class="btn btn-outline-secondary">Liste</button>

              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kalender
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Alle</a></li>
                  <li><a class="dropdown-item" href="#">Ferien & Feiertage</a></li>
                  <li><a class="dropdown-item" href="#">Schulveranstaltungen</a></li>
                  <li><a class="dropdown-item" href="#">Gremien & AGs</a></li>
                  <li><a class="dropdown-item" href="#">Schüler*innen</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
