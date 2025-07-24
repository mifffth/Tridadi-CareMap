export class CreditView {
    constructor(container) {
      this.container = container;
      this.presenter = null;
    }
  
    setPresenter(presenter) {
      this.presenter = presenter;
    }
  
    render() {
      this.container.innerHTML = `
<div class="credit-container">
    <h2 class="credit-title">Credit</h2>

    <div class="logo-section">

        <a href="https://www.instagram.com/pandriberseri" target="_blank">
            <img src="icons/Logo_Pandri.png" alt="Logo Pandri Berseri" />
        </a>
        <a href="https://ugm.ac.id/" target="_blank">
            <img src="icons/Logo_UGM.png" alt="Logo UGM" />
        </a>
        <a href="https://kkn.ugm.ac.id/" target="_blank">
            <img src="icons/Logo_KKN_UGM.png" alt="Logo KKN UGM" />
        </a>

    </div>

    <div class="credit-text">
        <p>Proyek WebGIS ini dikembangkan sebagai bagian dari program <strong>Kuliah Kerja Nyata (KKN)</strong> di
            Tridadi, Sleman.</p>
        <p>Data peta bersumber dari <a href="https://www.openstreetmap.org/#map=17/-7.723548/110.358798"
                target="_blank">OpenStreetMap</a>.</p>
        <p>Pengembangan menggunakan <strong>Webpack</strong> untuk modularisasi dan optimasi kode.</p>
        <p>Kontributor utama: <strong>Miftah</strong></p>
    </div>
</div>
    `;
    }    
  }