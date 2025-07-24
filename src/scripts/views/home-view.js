export class HomeView {
  constructor(container) {
    this.container = container;
    this.presenter = null;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  render() {
    this.container.innerHTML = `
<div class="hero">
  <h1 class="text-4xl font-bold">WebGIS Persebaran Fasilitas Kesehatan</h1>
</div>

<main class="home-content">
  <div class="container">
    <div class="content">
      <h2>Selamat Datang</h2>
      <p>
        WebGIS ini dirancang untuk memvisualisasikan persebaran fasilitas kesehatan seperti rumah sakit,
        puskesmas, apotek, dan fasilitas kesehatan lainnya di wilayah Kelurahan Tridadi, Sleman, Daerah Istimewa Yogyakarta
        secara interaktif dan informatif, disertai informasi nama dan koordinat geografis dari setiap titik
        fasilitas kesehatan.
      </p>
    </div>
  </div>

  <div class="container tridadi-info">
    <div class="intro bg-gray-100 p-4 rounded-xl shadow">
      <h3 class="text-2xl font-bold mb-2">Tentang Kalurahan Tridadi</h3>
      <p>
        Tridadi adalah kalurahan di Kapanéwon Sleman, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Selain
        sebagai pusat pemerintahan Kabupaten Sleman,
        Tridadi juga dikenal karena memiliki <strong>Stadion Tridadi</strong>, markas latihan klub sepak bola
        <strong>PSS Sleman</strong> sebelum memiliki Stadion Maguwoharjo.
      </p>
      <ul class="mt-3 list-disc list-inside">
        <li>Provinsi: Daerah Istimewa Yogyakarta</li>
        <li>Kabupaten: Sleman</li>
        <li>Kecamatan: Sleman</li>
        <li>Koordinat: 7°42′47.226″S, 110°21′23.586″E</li>
      </ul>
    </div>
  </div>

  <div class="map-full-width">
    <div id="map-home"></div>
  </div>

  <div class="gallery-container">
    <div class="gallery">
      ${[1, 2, 3, 4, 5, 6]
        .map(
          (i) => `
      <img src="/images/foto${i}.jpg" alt="Fasilitas ${i}" class="gallery-img" data-full="/images/foto${i}.jpg">
      `
        )
        .join("")}
    </div>
  </div>

  <div class="intro-full-width-container">
    <div class="intro">
      <h3 class="text-2xl font-bold">Mengapa Faskes Penting?</h3>
      <p>
        Faskes yang tersebar secara merata dapat meningkatkan akses layanan kesehatan, mengurangi waktu respons
        darurat, dan mendorong pemerataan kualitas hidup masyarakat. Informasi yang transparan tentang lokasi
        faskes membantu perencanaan wilayah dan pengambilan keputusan kebijakan publik.
      </p>
    </div>
  </div>

  <div class="container">
    <div class="chart-section">
      <div id="chart"></div>
    </div>
    <hr>
  </div>

  <div class="bottom-content">
    <div class="content-one">
      <p>
        Proyek WebGIS ini merupakan hasil dari program Kuliah Kerja Nyata (KKN) PPM-UGM 2025 Periode II yang
        dilaksanakan di Kalurahan Tridadi, Kabupaten Sleman, Daerah Istimewa Yogyakarta.
      </p>
    </div>
    <div class="content-two">
      <p>
        WebGIS ini bertujuan memudahkan masyarakat dalam mengakses informasi mengenai lokasi fasilitas kesehatan
        terdekat seperti rumah sakit, puskesmas, dan lainnya yang belum terjangkau internet/diketahui oleh umum.
      </p>
    </div>
  </div>

  <div id="image-modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50">
    <div class="relative">
      <img id="modal-image" src="" alt="Preview" class="max-h-[90vh] rounded-xl shadow-lg">
      <button id="modal-close"
        class="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 text-black">
        ✕
      </button>
    </div>
  </div>
</main>
    `;

    const map = L.map("map-home").setView([-7.7125, 110.3503], 15);

    const baseLayers = {
      OpenStreetMap: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap",
        }
      ),
      OpenTopoMap: L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution: "Map data: &copy; OpenTopoMap contributors",
        }
      ),
      "Stadia satellite": L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
        {
          attribution:
            "&copy; CNES, Distribution Airbus DS | &copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap",
          ext: "jpg",
        }
      ),
    };

    baseLayers["OpenStreetMap"].addTo(map);

    const layersControl = L.control
      .layers(baseLayers, null, {
        position: "topright",
        collapsed: true,
      })
      .addTo(map);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([-7.7125, 110.3503])
      .addTo(map)
      .bindPopup(
        "<b>Kantor Kalurahan Tridadi</b><br>Pusat pemerintahan di Tridadi, Sleman."
      )
      .openPopup();

    fetch("./data/batas_dusun.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("GeoJSON data loaded:", data);
        console.log("Type:", data.type);
        console.log("Features count:", data.features?.length || "No features");

        const geojsonLayer = L.geoJSON(data, {
          style: function (feature) {
            console.log("Styling feature:", feature);
            return {
              color: "#3388ff",
              weight: 3,
              opacity: 1,
              fillOpacity: 0.5,
            };
          },
          onEachFeature: function (feature, layer) {
            console.log("Feature:", feature);
            if (feature.properties) {
              layer.bindPopup("Dusun: " + feature.properties.FID_1);
            }
          },
        });

        console.log(
          "GeoJSON Layer created:",
          geojsonLayer.getLayers().length,
          "layers"
        );

        layersControl.addOverlay(geojsonLayer, "Jaban");
        geojsonLayer.addTo(map);

        this.geojsonLayer = geojsonLayer;
      })

      .catch((error) =>
        console.error("Error loading the GeoJSON file:", error)
      );

    fetch("./faskes.json")
      .then((response) => response.json())
      .then((data) => {
        const countsByTipe = data.reduce((acc, item) => {
          acc[item.tipe] = (acc[item.tipe] || 0) + 1;
          return acc;
        }, {});

        let categories = Object.keys(countsByTipe);

        const lainnyaIndex = categories.indexOf("Lainnya");
        if (lainnyaIndex > -1) {
          const lainnyaCategory = categories.splice(lainnyaIndex, 1)[0];
          categories.push(lainnyaCategory);
        }

        const values = categories.map((category) => countsByTipe[category]);

        const colorMap = {
          Apotek: "#1E88E5",
          Klinik: "#43A047",
          "Praktek Mandiri": "#FFC107",
          Posyandu: "#E91E63",
          Puskesmas: "#E53935",
          Lainnya: "#9C27B0",
        };

        const barColors = categories.map((tipe) => colorMap[tipe] || "#888");

        const options = {
          series: [
            {
              name: "Jumlah Fasilitas",
              data: values,
            },
          ],
          chart: {
            type: "bar",
            height: 350,
            fontFamily: "Segoe UI, sans-serif",
          },
          xaxis: {
            categories: categories, 
            title: { text: "Tipe Fasilitas" },
          },
          yaxis: {
            title: { text: "Jumlah" },
            allowDecimals: false,
          },
          plotOptions: {
            bar: {
              distributed: true,
              borderRadius: 4,
              columnWidth: "50%",
            },
          },
          tooltip: {
            y: {
              formatter: (val) => `${val} fasilitas`,
            },
          },
          colors: barColors,
          legend: {
            show: false,
          },
        };
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      })
      .catch((error) => console.error("Gagal memuat JSON:", error));
  }
}
