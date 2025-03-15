document.addEventListener('DOMContentLoaded', () => {
  const templateSelector = document.getElementById('template-selector');
  const dynamicTemplate = document.getElementById('dynamic-template');
  const screenshotBtn = document.getElementById('screenshot-btn');
  const downloadBtn = document.getElementById('download-btn');

  // Read query string parameters
  const urlParams = new URLSearchParams(window.location.search);
  const templateParam = urlParams.get('template') || 'template1';
  const titleParam = urlParams.get('title') || 'Default Title';
  const contentParam = urlParams.get('content') ? urlParams.get('content').split('||') : ['Sample text 1', 'Sample text 2', 'Sample text 3'];
  const iconsParam = urlParams.get('icons') ? urlParams.get('icons').split('||') : ['fas fa-star', 'fas fa-check', 'fas fa-info'];

  // Define 10 template designs
  const templates = {
    template1: {
      class: 'modern-business-template',
      structure: (data) => `
        <div class="modern-business-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="content-grid">
            ${data.content.map((text, i) => `
              <div class="info-card">
                <i class="icon ${data.icons[i] || 'fas fa-chart-line'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template2: {
      class: 'timeline-flow-template',
      structure: (data) => `
        <div class="timeline-flow-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="timeline-container">
            ${data.content.map((text, i) => `
              <div class="timeline-item ${i % 2 === 0 ? 'left' : 'right'}">
                <div class="timeline-icon">
                  <i class="icon ${data.icons[i] || 'fas fa-clock'}"></i>
                </div>
                <div class="timeline-content">
                  <p>${text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template3: {
      class: 'stats-dashboard-template',
      structure: (data) => `
        <div class="stats-dashboard-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="stats-grid">
            ${data.content.map((text, i) => `
              <div class="stat-card">
                <i class="icon ${data.icons[i] || 'fas fa-chart-bar'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template4: {
      class: 'feature-grid-template',
      structure: (data) => `
        <div class="feature-grid-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="grid">
            ${data.content.map((text, i) => `
              <div class="feature-card">
                <i class="icon ${data.icons[i] || 'fas fa-th-large'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template5: {
      class: 'process-flow-template',
      structure: (data) => `
        <div class="process-flow-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="process-steps">
            ${data.content.map((text, i) => `
              <div class="step">
                <i class="icon ${data.icons[i] || 'fas fa-cogs'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template6: {
      class: 'comparison-chart-template',
      structure: (data) => `
        <div class="comparison-chart-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="chart">
            ${data.content.map((text, i) => `
              <div class="item">
                <i class="icon ${data.icons[i] || 'fas fa-balance-scale'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template7: {
      class: 'data-showcase-template',
      structure: (data) => `
        <div class="data-showcase-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="data-grid">
            ${data.content.map((text, i) => `
              <div class="data-card">
                <i class="icon ${data.icons[i] || 'fas fa-database'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template8: {
      class: 'step-guide-template',
      structure: (data) => `
        <div class="step-guide-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="steps">
            ${data.content.map((text, i) => `
              <div class="step">
                <i class="icon ${data.icons[i] || 'fas fa-step-forward'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template9: {
      class: 'product-features-template',
      structure: (data) => `
        <div class="product-features-template">
          <h1 class="template-title">${data.title}</h1>
          <div class="features">
            ${data.content.map((text, i) => `
              <div class="feature">
                <i class="icon ${data.icons[i] || 'fas fa-box-open'}"></i>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `
    },
    template10: {
      class: 'achievement-list-template',
      structure: (data) => `
        <div class="achievement-list-template">
          <h1 class="template-title">${data.title}</h1>
          <ul>
            ${data.content.map((text, i) => `
              <li>
                <i class="icon ${data.icons[i] || 'fas fa-trophy'}"></i>
                ${text}
              </li>
            `).join('')}
          </ul>
        </div>
      `
    }
  };

  // Render the selected template using query data
  function renderTemplate() {
    const selectedTemplate = templates[templateParam];
    if (selectedTemplate) {
      dynamicTemplate.className = `template-display ${selectedTemplate.class}`;
      dynamicTemplate.innerHTML = selectedTemplate.structure({
        title: titleParam,
        content: contentParam,
        icons: iconsParam
      });
    }
  }

  // Screenshot capture using MarkupGo API
  async function captureScreenshot() {
    const MARKUP_API_KEY = 'd1fcd56a-5879-4d76-9c9b-60a0d9c7b425';
    try {
      const response = await fetch('https://api.markupgo.com/api/v1/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': MARKUP_API_KEY
        },
        body: JSON.stringify({
          source: { type: 'url', url: window.location.href },
          options: {
            format: 'png',
            quality: 90,
            viewport: { width: 1200, height: 800 }
          }
        })
      });
      const data = await response.json();
      if (data.url) {
        downloadBtn.href = data.url;
        downloadBtn.style.display = 'inline-block';
      }
    } catch (error) {
      console.error('Screenshot error:', error);
    }
  }

  // Set the selector to match query string and wire up events
  templateSelector.value = templateParam;
  templateSelector.addEventListener('change', (e) => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('template', e.target.value);
    window.location.href = newUrl.toString(); // reloads the page
  });
  document.getElementById('preview-btn').addEventListener('click', renderTemplate);
  screenshotBtn.addEventListener('click', captureScreenshot);

  // Initial render
  renderTemplate();
});