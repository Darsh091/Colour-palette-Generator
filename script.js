 const paletteEl = document.getElementById('palette');
    const generateBtn = document.getElementById('generate-btn');

    const numColors = 5;

    function randomHexColor() {
      // Generate random hex color string #RRGGBB
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    }

    function createColorStrip(colorHex) {
      const strip = document.createElement('div');
      strip.classList.add('color-strip');
      strip.style.backgroundColor = colorHex;

      const tooltip = document.createElement('div');
      tooltip.classList.add('copy-tooltip');
      tooltip.textContent = 'Copied!';

      const hexCodeEl = document.createElement('div');
      hexCodeEl.classList.add('hex-code');
      hexCodeEl.textContent = colorHex;

      strip.appendChild(tooltip);
      strip.appendChild(hexCodeEl);

      strip.addEventListener('click', () => {
        // Copy hex code to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(colorHex).then(() => {
            tooltip.classList.add('visible');
            setTimeout(() => tooltip.classList.remove('visible'), 1000);
          }).catch(() => alert('Clipboard copy failed'));
        } else {
          // fallback for older browsers
          const input = document.createElement('input');
          input.value = colorHex;
          document.body.appendChild(input);
          input.select();
          try {
            document.execCommand('copy');
            tooltip.classList.add('visible');
            setTimeout(() => tooltip.classList.remove('visible'), 1000);
          } catch {
            alert('Clipboard copy failed');
          }
          document.body.removeChild(input);
        }
      });

      return strip;
    }

    function generatePalette() {
      paletteEl.innerHTML = '';
      for (let i = 0; i < numColors; i++) {
        const color = randomHexColor();
        const strip = createColorStrip(color);
        paletteEl.appendChild(strip);
      }
    }

    generateBtn.addEventListener('click', generatePalette);

    // Generate initial palette on page load
    generatePalette();