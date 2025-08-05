import Two from 'two.js';
import chroma from 'chroma-js';
import { v4 as uuidv4 } from 'uuid';
import { SeededRandom } from './prng';

// --- Your 45 Curated Color Palettes ---
const palettes = [
  { name: 'Desert Sunset', colors: ['#E27D60', '#85CDCA', '#E8A87C', '#C38D9E', '#41B3A3'] },
  { name: 'Ocean Depths', colors: ['#012E4A', '#036280', '#2A9D8F', '#E9C46A', '#F4A261'] },
  { name: 'Forest Moss', colors: ['#354F52', '#52796F', '#84A98C', '#CAD2C5', '#A5A58D'] },
  { name: 'Arctic Dawn', colors: ['#8ECAE6', '#219EBC', '#023047', '#FFB703', '#FB8500'] },
  { name: 'Volcanic', colors: ['#D00000', '#FF9505', '#FFEA00', '#774936', '#3C0919'] },
  { name: 'Neon Dream', colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000', '#00FF00'] },
  { name: 'Jewel Tones', colors: ['#6A0DAD', '#FF0038', '#00818F', '#FFC600', '#FF6B6B'] },
  { name: 'Psychedelic', colors: ['#540D6E', '#EE4266', '#FFD23F', '#3BCEAC', '#0EAD69'] },
  { name: 'Festival', colors: ['#FF6F61', '#6B5B95', '#88B04B', '#EFC050', '#955251'] },
  { name: 'Clay Palette', colors: ['#EDC9AF', '#E9AFA3', '#C97C5D', '#774936', '#3D2B1F'] },
  { name: 'Desert Sands', colors: ['#D4A276', '#BC8A5F', '#A97155', '#8B5D33', '#6F4518'] },
  { name: 'Mountain Fog', colors: ['#D0D4D8', '#A8B2C0', '#7E8A97', '#556270', '#3A4750'] },
  { name: 'Arctic Ice', colors: ['#CAE4DB', '#DCAE1D', '#00303F', '#7A9D96', '#3A6351'] },
  { name: 'Moonlight', colors: ['#E2DBE0', '#A8A4CE', '#7F7FBF', '#5A5A93', '#3A3A5F'] },
  { name: 'Deep Ocean', colors: ['#03045E', '#023E8A', '#0077B6', '#00B4D8', '#90E0EF'] },
  { name: 'Golden Hour', colors: ['#F7B267', '#F79D65', '#F4845F', '#F27059', '#F25C54'] },
  { name: 'Autumn Leaves', colors: ['#8C2308', '#A64600', '#BF6F00', '#D99700', '#F2C100'] },
  { name: 'Terracotta', colors: ['#E27D60', '#E9806E', '#E8A87C', '#C38D9E', '#86C3B0'] },
  { name: 'Azure Blues', colors: ['#03045E', '#023E8A', '#0077B6', '#00B4D8', '#90E0EF'] },
  { name: 'Emerald Greens', colors: ['#0D3B2A', '#1A936F', '#88D498', '#C6DABF', '#EFF7E1'] },
  { name: 'Royal Purples', colors: ['#3D348B', '#7678ED', '#9B5DE5', '#F15BB5', '#FEE440'] },
  { name: 'Teal & Coral', colors: ['#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#264653'] },
  { name: 'Amber & Indigo', colors: ['#FF9E00', '#FFD166', '#118AB2', '#073B4C', '#EF476F'] },
  { name: 'Crimson & Gold', colors: ['#9D0208', '#D00000', '#DC2F02', '#E85D04', '#FFAA00'] },
  { name: 'Cotton Candy', colors: ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF'] },
  { name: 'Easter Eggs', colors: ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'] },
  { name: 'Spring Blossoms', colors: ['#F7C1BB', '#FFAAA5', '#B8E1FF', '#A5DEE4', '#C4E7D4'] },
  { name: 'Indian Spice', colors: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'] },
  { name: 'Japanese Wasabi', colors: ['#2F4B26', '#3E885B', '#85BDA6', '#BEDCFE', '#EFE9F4'] },
  { name: 'Moroccan Market', colors: ['#D4A276', '#BC8A5F', '#A97155', '#8B5D33', '#6F4518'] },
  { name: 'Cyber Neon', colors: ['#FF10F0', '#00F0FF', '#00FFA3', '#FF00FF', '#7200FF'] },
  { name: 'Holographic', colors: ['#FF00CC', '#33FFCC', '#00CCFF', '#6600FF', '#FF0066'] },
  { name: 'Matrix', colors: ['#00FF41', '#0D2818', '#04471C', '#058C42', '#16DB65'] },
  { name: 'Gold Leaf', colors: ['#D4AF37', '#FFD700', '#E6BE8A', '#B8860B', '#8B7500'] },
  { name: 'Silver Moon', colors: ['#C0C0C0', '#D3D3D3', '#E0E0E0', '#F5F5F5', '#A9A9A9'] },
  { name: 'Bronze Age', colors: ['#CD7F32', '#B87333', '#8C7853', '#A67C00', '#6C541E'] },
  { name: 'Spring Awakening', colors: ['#C5EBC3', '#B7E3CC', '#A9D9D9', '#9BCFE0', '#8DC6D6'] },
  { name: 'Summer Heat', colors: ['#FF6F61', '#FF8E72', '#FFAA80', '#FFC08D', '#FFD699'] },
  { name: 'Autumn Forest', colors: ['#8C2308', '#A64600', '#BF6F00', '#D99700', '#F2C100'] },
  { name: 'Winter Frost', colors: ['#CAE4DB', '#D4E6D0', '#E1E6D3', '#F0F0F0', '#A1C3D1'] },
  { name: 'Van Gogh Stars', colors: ['#3944BC', '#4A5FDB', '#5B79F8', '#6D93FF', '#7EADFF'] },
  { name: 'Monet Water', colors: ['#8ECAE6', '#219EBC', '#126782', '#073B4C', '#023047'] },
  { name: 'Klimt Gold', colors: ['#D4AF37', '#C19E41', '#AE8D4B', '#9B7C55', '#886B5F'] },
  { name: 'Rainbow Spectrum', colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'] },
  { name: 'Blackwork', colors: ['#000000', '#222222', '#444444', '#666666', '#888888', '#AAAAAA'] },
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('mandala-canvas')!;
  const button = document.getElementById('generate-button')!;
  const themeToggle = document.getElementById('theme-toggle')!;
  const uuidDisplay = document.getElementById('uuid-display')!;
  const hashDisplay = document.getElementById('hash-display')!;

  const two = new Two({
    width: 500,
    height: 500,
    type: Two.Types.svg,
  }).appendTo(container);

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  }

  function generateMandala() {
    two.clear();

    const fullUuid = uuidv4();
    const hash = fullUuid.replace(/-/g, '').substring(0, 25);
    const seed = parseInt(hash.substring(0, 8), 16);
    const prng = new SeededRandom(seed);

    uuidDisplay.textContent = fullUuid;
    hashDisplay.textContent = hash;

    let layers: number;
    let symmetry: number;
    const minLayers = 7, maxLayers = 18;
    const minSymmetry = 20, maxSymmetry = 80;

    if (prng.nextFloat() < 0.5) {
      layers = prng.nextInt(minLayers, maxLayers);
      symmetry = Math.round(layers * 3);
      symmetry = Math.max(minSymmetry, Math.min(maxSymmetry, symmetry));
    } else {
      symmetry = prng.nextInt(minSymmetry, maxSymmetry);
      layers = Math.round(symmetry / 3);
      layers = Math.max(minLayers, Math.min(maxLayers, layers));
    }

    const selectedPalette = palettes[prng.nextInt(0, palettes.length - 1)];
    const isDarkMode = document.body.classList.contains('dark-mode');
    const contrastColor = isDarkMode ? '#FFFFFF' : '#000000';
    const strokeColor = isDarkMode ? '#ffffff' : '#000000';

    const center = { x: two.width / 2, y: two.height / 2 };
    const maxRadius = two.width / 2 * 0.9;

    const weights = Array.from({ length: layers }, () => prng.nextFloat());
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const normalizedWeights = weights.map(w => w / totalWeight);

    let currentRadius = 0;
    for (let i = 0; i < layers; i++) {
      const layerWidth = normalizedWeights[i] * maxRadius;
      const innerRadius = currentRadius;
      const layerRadius = currentRadius + layerWidth;
      currentRadius = layerRadius;

      const shapeType = prng.nextInt(0, 15);
      const layerColor = selectedPalette.colors[i % selectedPalette.colors.length];
      const styleChoice = prng.nextFloat();

      let superformulaParams: any = null;
      if (shapeType === 14) {
        superformulaParams = {
          m: prng.nextInt(3, 12),
          n1: 1 + prng.nextFloat() * 10,
          n2: 1 + prng.nextFloat() * 10,
          n3: 1 + prng.nextFloat() * 10,
        };
      }

      for (let j = 0; j < symmetry; j++) {
        const angle = (j / symmetry) * (Math.PI * 2);

        switch (shapeType) {
          case 0: // Fine Spikes (Stylized Version)
            const angleStepSpike = (Math.PI * 2) / symmetry;
            const spikeInnerR = layerRadius * 0.85;

            // Calculate the final absolute coordinates for the 3 points of the triangle
            const tip = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
            const baseLeft = new Two.Vector(center.x + spikeInnerR * Math.cos(angle - angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle - angleStepSpike / 2));
            const baseRight = new Two.Vector(center.x + spikeInnerR * Math.cos(angle + angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle + angleStepSpike / 2));

            // Create the shape from the points
            const spike = new Two.Path([tip, baseLeft, baseRight], true);

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              spike.fill = layerColor;
              spike.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              spike.noFill();
              spike.stroke = layerColor;
              spike.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              spike.fill = layerColor;
              spike.stroke = contrastColor;
              spike.linewidth = 2;
            }

            two.add(spike);
            break;

          /*case 0: // Fine Spikes (Blueprint Version)
          const angleStepSpike = (Math.PI * 2) / symmetry;
          const spikeInnerR = layerRadius * 0.85;

          // Calculate the final absolute coordinates for the 3 points of the triangle
          const tip = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
          const baseLeft = new Two.Vector(center.x + spikeInnerR * Math.cos(angle - angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle - angleStepSpike / 2));
          const baseRight = new Two.Vector(center.x + spikeInnerR * Math.cos(angle + angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle + angleStepSpike / 2));

          // Create the shape from the points
          const spike = new Two.Path([tip, baseLeft, baseRight], true);

          // Apply Blueprint styling
          spike.noFill();
          spike.stroke = strokeColor; // Uses the monochrome theme color
          spike.linewidth = 1.5;
          
          two.add(spike);
          break;*/

          case 1: // Arched Gates (Stylized Version)
            const archInnerR = layerRadius * 0.7;
            const startAngle = angle - (Math.PI / symmetry) * 0.8;
            const endAngle = angle + (Math.PI / symmetry) * 0.8;

            // Create the shape
            const arch = two.makeArcSegment(center.x, center.y, archInnerR, layerRadius, startAngle, endAngle);

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              arch.fill = layerColor;
              arch.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              arch.noFill();
              arch.stroke = layerColor;
              arch.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              arch.fill = layerColor;
              arch.stroke = contrastColor;
              arch.linewidth = 2;
            }
            break;

          /*
          case 1: // Arched Gates (Blueprint Version)
          const archInnerR = layerRadius * 0.7;
          const startAngle = angle - (Math.PI / symmetry) * 0.8;
          const endAngle = angle + (Math.PI / symmetry) * 0.8;

          // Create the shape
          const arch = two.makeArcSegment(center.x, center.y, archInnerR, layerRadius, startAngle, endAngle);

          // Apply Blueprint styling
          arch.noFill();
          arch.stroke = strokeColor; // Monochrome theme color
          arch.linewidth = 1.5;
          break;*/

          case 2: // Woven Ring (Stylized Version)
            if (j === 0) { // This is a full-ring shape, so we only draw it once.
              const outerVertices = [], innerVertices = [];
              const weaveCount = symmetry * 3, weaveAmplitude = layerWidth * 0.25;
              const baseRingRadius = innerRadius + (layerWidth / 2);
              const weaveFrequency = Math.max(3, Math.floor(symmetry / 2));

              for (let k = 0; k <= weaveCount; k++) {
                const weaveAngle = (k / weaveCount) * (Math.PI * 2);
                const waveFactor = Math.sin(weaveAngle * weaveFrequency);
                outerVertices.push(new Two.Vector(center.x + (baseRingRadius + weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius + weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                innerVertices.push(new Two.Vector(center.x + (baseRingRadius - weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius - weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
              }
              const wovenPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);

              // Apply Hybrid Render styling
              if (styleChoice < 0.5) { // Fill Only
                wovenPath.fill = layerColor;
                wovenPath.noStroke();
              } else if (styleChoice < 0.85) { // Stroke Only
                wovenPath.noFill();
                wovenPath.stroke = layerColor;
                wovenPath.linewidth = 1.5;
              } else { // Fill + Contrast Stroke
                wovenPath.fill = layerColor;
                wovenPath.stroke = contrastColor;
                wovenPath.linewidth = 2;
              }

              two.add(wovenPath);
            }
            break;

          /*case 2: // Woven Ring (Blueprint Version)
          if (j === 0) { // This is a full-ring shape, so we only draw it once.
            const outerVertices = [], innerVertices = [];
            const weaveCount = symmetry * 3, weaveAmplitude = layerWidth * 0.25;
            const baseRingRadius = innerRadius + (layerWidth / 2);
            const weaveFrequency = Math.max(3, Math.floor(symmetry / 2));

            for (let k = 0; k <= weaveCount; k++) {
              const weaveAngle = (k / weaveCount) * (Math.PI * 2);
              const waveFactor = Math.sin(weaveAngle * weaveFrequency);
              outerVertices.push(new Two.Vector(center.x + (baseRingRadius + weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius + weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
              innerVertices.push(new Two.Vector(center.x + (baseRingRadius - weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius - weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
            }
            const wovenPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
            
            // Apply Blueprint styling
            wovenPath.noFill();
            wovenPath.stroke = strokeColor; // Monochrome theme color
            wovenPath.linewidth = 1.5;

            two.add(wovenPath);
          }
          break;*/

          case 3: // Geometric Lattice (Stylized Version)
            const angleStepLattice = (Math.PI * 2) / symmetry;

            // Calculate coordinates for the first line
            const x1 = center.x + Math.cos(angle) * innerRadius;
            const y1 = center.y + Math.sin(angle) * innerRadius;
            const x2 = center.x + Math.cos(angle + angleStepLattice) * layerRadius;
            const y2 = center.y + Math.sin(angle + angleStepLattice) * layerRadius;
            const line1 = two.makeLine(x1, y1, x2, y2);

            // Calculate coordinates for the second line
            const x3 = center.x + Math.cos(angle) * layerRadius;
            const y3 = center.y + Math.sin(angle) * layerRadius;
            const x4 = center.x + Math.cos(angle + angleStepLattice) * innerRadius;
            const y4 = center.y + Math.sin(angle + angleStepLattice) * innerRadius;
            const line2 = two.makeLine(x3, y3, x4, y4);

            // Apply Stylized styling to both lines
            // Since this shape can't be filled, it always uses a stroke.
            // We use the colorful `layerColor` to match the palette.
            line1.stroke = layerColor;
            line1.linewidth = 1;
            line2.stroke = layerColor;
            line2.linewidth = 1;
            break;
          /* case 3: // Geometric Lattice (Blueprint Version)
          const angleStepLattice = (Math.PI * 2) / symmetry;

          // Calculate coordinates for the first line
          const x1 = center.x + Math.cos(angle) * innerRadius;
          const y1 = center.y + Math.sin(angle) * innerRadius;
          const x2 = center.x + Math.cos(angle + angleStepLattice) * layerRadius;
          const y2 = center.y + Math.sin(angle + angleStepLattice) * layerRadius;
          const line1 = two.makeLine(x1, y1, x2, y2);

          // Calculate coordinates for the second line
          const x3 = center.x + Math.cos(angle) * layerRadius;
          const y3 = center.y + Math.sin(angle) * layerRadius;
          const x4 = center.x + Math.cos(angle + angleStepLattice) * innerRadius;
          const y4 = center.y + Math.sin(angle + angleStepLattice) * innerRadius;
          const line2 = two.makeLine(x3, y3, x4, y4);

          // Apply Blueprint styling to both lines
          line1.stroke = strokeColor;
          line1.linewidth = 1;
          line2.stroke = strokeColor;
          line2.linewidth = 1;
          break;8*/

          case 4: // Boundary Ring (Stylized Version)
            if (j === 0) { // Only draw once per layer
              // Draw the inner circle of the ring
              const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
              innerBoundary.noFill();
              innerBoundary.stroke = layerColor; // Colorful palette color
              innerBoundary.linewidth = 1.5;

              // Draw the outer circle of the ring
              const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
              outerBoundary.noFill();
              outerBoundary.stroke = layerColor; // Colorful palette color
              outerBoundary.linewidth = 1.5;
            }
            break;

          /*case 4: // Boundary Ring (Blueprint Version)
          if (j === 0) { // Only draw once per layer
            // Draw the inner circle of the ring
            const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
            innerBoundary.noFill();
            innerBoundary.stroke = strokeColor; // Monochrome theme color
            innerBoundary.linewidth = 1.5;

            // Draw the outer circle of the ring
            const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
            outerBoundary.noFill();
            outerBoundary.stroke = strokeColor; // Monochrome theme color
            outerBoundary.linewidth = 1.5;
          }
          break;*/

          // REPLACED WITH GRADIENT RING
          case 5: // Gradient Ring (Stylized Version)
            if (j === 0) { // Only draw once per layer
              // Pick two adjacent colors from the palette for the gradient
              const color1 = selectedPalette.colors[i % selectedPalette.colors.length];
              const color2 = selectedPalette.colors[(i + 1) % selectedPalette.colors.length];

              // Create a linear gradient that goes across the layer
              const gradient = two.makeLinearGradient(
                center.x, center.y - (innerRadius + layerWidth / 2),
                center.x, center.y + (innerRadius + layerWidth / 2),
                new Two.Stop(0, color1),
                new Two.Stop(1, color2)
              );

              const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);
              ring.noFill();
              ring.stroke = gradient; // Apply the gradient as the stroke
              ring.linewidth = layerWidth * 0.95; // Use a thick stroke to create the ring
            }
            break;

          /*case 5: // Gradient Ring (Blueprint Version)
          if (j === 0) { // Only draw once per layer
            // In Blueprint mode, a Gradient Ring becomes a Boundary Ring.
            const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
            innerBoundary.noFill();
            innerBoundary.stroke = strokeColor;
            innerBoundary.linewidth = 1.5;

            const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
            outerBoundary.noFill();
            outerBoundary.stroke = strokeColor;
            outerBoundary.linewidth = 1.5;
          }
          break;*/

          case 6: // Negative Space
            break;

          case 7: // Scalloped Ring (Stylized Version)
            if (j === 0) { // This is a full-ring shape, so we only draw it once.
              const outerVertices = [], innerVertices = [];
              const scallopCount = symmetry * 3, scallopAmplitude = layerWidth * 0.4;

              for (let k = 0; k <= scallopCount; k++) {
                const scallopAngle = (k / scallopCount) * (Math.PI * 2);
                const r_outer = layerRadius - (scallopAmplitude / 2) + scallopAmplitude * Math.sin(scallopAngle * symmetry);
                const r_inner = innerRadius;
                outerVertices.push(new Two.Vector(center.x + r_outer * Math.cos(scallopAngle), center.y + r_outer * Math.sin(scallopAngle)));
                innerVertices.push(new Two.Vector(center.x + r_inner * Math.cos(scallopAngle), center.y + r_inner * Math.sin(scallopAngle)));
              }
              const scallopPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);

              // Apply Hybrid Render styling
              if (styleChoice < 0.5) { // Fill Only
                scallopPath.fill = layerColor;
                scallopPath.noStroke();
              } else if (styleChoice < 0.85) { // Stroke Only
                scallopPath.noFill();
                scallopPath.stroke = layerColor;
                scallopPath.linewidth = 1.5;
              } else { // Fill + Contrast Stroke
                scallopPath.fill = layerColor;
                scallopPath.stroke = contrastColor;
                scallopPath.linewidth = 2;
              }

              two.add(scallopPath);
            }
            break;

          /*case 7: // Scalloped Ring (Blueprint Version)
          if (j === 0) { // This is a full-ring shape, so we only draw it once.
            const outerVertices = [], innerVertices = [];
            const scallopCount = symmetry * 3, scallopAmplitude = layerWidth * 0.4;

            for (let k = 0; k <= scallopCount; k++) {
              const scallopAngle = (k / scallopCount) * (Math.PI * 2);
              const r_outer = layerRadius - (scallopAmplitude / 2) + scallopAmplitude * Math.sin(scallopAngle * symmetry);
              const r_inner = innerRadius;
              outerVertices.push(new Two.Vector(center.x + r_outer * Math.cos(scallopAngle), center.y + r_outer * Math.sin(scallopAngle)));
              innerVertices.push(new Two.Vector(center.x + r_inner * Math.cos(scallopAngle), center.y + r_inner * Math.sin(scallopAngle)));
            }
            const scallopPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
            
            // Apply Blueprint styling
            scallopPath.noFill();
            scallopPath.stroke = strokeColor; // Monochrome theme color
            scallopPath.linewidth = 1.5;

            two.add(scallopPath);
          }
          break;*/

          case 8: // Dotted Ring (Stylized Version)
            // Create the circle for the dot
            const dot = two.makeCircle(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle), 3);

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              dot.fill = layerColor;
              dot.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              dot.noFill();
              dot.stroke = layerColor;
              dot.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              dot.fill = layerColor;
              dot.stroke = contrastColor;
              dot.linewidth = 2;
            }
            break;

          /*case 8: // Dotted Ring (Blueprint Version)
          // Create the circle for the dot
          const dot = two.makeCircle(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle), 3);

          // Apply Blueprint styling (an outline of a circle)
          dot.noFill();
          dot.stroke = strokeColor; // Monochrome theme color
          dot.linewidth = 1.5;
          break;*/

          case 9: // Triangles (Stylized Version)
            const triangleInnerR = innerRadius + layerWidth * 0.1;
            const angleStepTriangle = (Math.PI * 2) / symmetry;

            // Calculate the 3 points of the triangle
            const t1 = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
            const t2 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle - angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle - angleStepTriangle / 2));
            const t3 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle + angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle + angleStepTriangle / 2));

            const triangle = new Two.Path([t1, t2, t3], true);

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              triangle.fill = layerColor;
              triangle.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              triangle.noFill();
              triangle.stroke = layerColor;
              triangle.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              triangle.fill = layerColor;
              triangle.stroke = contrastColor;
              triangle.linewidth = 2;
            }

            two.add(triangle);
            break;

          /*case 9: // Triangles (Blueprint Version)
          const triangleInnerR = innerRadius + layerWidth * 0.1;
          const angleStepTriangle = (Math.PI * 2) / symmetry;

          // Calculate the 3 points of the triangle
          const t1 = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
          const t2 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle - angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle - angleStepTriangle / 2));
          const t3 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle + angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle + angleStepTriangle / 2));
          
          const triangle = new Two.Path([t1, t2, t3], true);

          // Apply Blueprint styling
          triangle.noFill();
          triangle.stroke = strokeColor; // Monochrome theme color
          triangle.linewidth = 1.5;

          two.add(triangle);
          break;*/


          case 10: // Dashed Line Ring (Stylized Version)
            if (j === 0) { // Only draw once per layer
              const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);

              // Apply Stylized styling (still a stroke, but with palette color)
              ring.noFill();
              ring.stroke = layerColor; // Colorful palette color
              ring.linewidth = 1.5;

              // Calculate and apply the dash properties
              const circumference = Math.PI * 2 * (innerRadius + layerWidth / 2);
              const dashLength = circumference / symmetry / 2;
              ring.dashes = [dashLength, dashLength * (0.5 + prng.nextFloat())];
            }
            break;

          /*case 11: // Dashed Line Ring (Blueprint Version)
          if (j === 0) { // Only draw once per layer
            const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);
            
            // Apply Blueprint styling
            ring.noFill();
            ring.stroke = strokeColor; // Monochrome theme color
            ring.linewidth = 1.5;

            // Calculate and apply the dash properties
            const circumference = Math.PI * 2 * (innerRadius + layerWidth / 2);
            const dashLength = circumference / symmetry / 2;
            ring.dashes = [dashLength, dashLength * (0.5 + prng.nextFloat())];
          }
          break;*/

          case 11: // Teardrop Petals (Stylized Version)
            const teardropLength = layerWidth * 0.9;
            const teardropWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.4;

            // Create the shape by modifying an ellipse
            const teardrop = two.makeEllipse(0, 0, teardropLength / 2, teardropWidth / 2);
            teardrop.vertices[0].x -= teardropLength * 0.25; // Make one end pointy

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              teardrop.fill = layerColor;
              teardrop.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              teardrop.noFill();
              teardrop.stroke = layerColor;
              teardrop.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              teardrop.fill = layerColor;
              teardrop.stroke = contrastColor;
              teardrop.linewidth = 2;
            }

            // Position the shape in the layer
            teardrop.rotation = angle;
            teardrop.translation.set(
              center.x + (innerRadius + teardropLength / 2) * Math.cos(angle),
              center.y + (innerRadius + teardropLength / 2) * Math.sin(angle)
            );
            break;

          /*case 12: // Teardrop Petals (Blueprint Version)
          const teardropLength = layerWidth * 0.9;
          const teardropWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.4;
          
          // Create the shape by modifying an ellipse
          const teardrop = two.makeEllipse(0, 0, teardropLength / 2, teardropWidth / 2);
          teardrop.vertices[0].x -= teardropLength * 0.25; // Make one end pointy

          // Apply Blueprint styling
          teardrop.noFill();
          teardrop.stroke = strokeColor; // Monochrome theme color
          teardrop.linewidth = 1.5;

          // Position the shape in the layer
          teardrop.rotation = angle;
          teardrop.translation.set(
            center.x + (innerRadius + teardropLength / 2) * Math.cos(angle),
            center.y + (innerRadius + teardropLength / 2) * Math.sin(angle)
          );
          break;*/

          case 12: // Leaf Petals (Stylized Version)
            const leafLength = layerWidth;
            const leafWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.5;

            // Create the curved path for the leaf
            const leaf = new Two.Path([
              new Two.Anchor(0, 0),
              new Two.Anchor(leafLength / 2, -leafWidth / 2),
              new Two.Anchor(leafLength, 0),
              new Two.Anchor(leafLength / 2, leafWidth / 2)
            ], true, true); // Closed and curved

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              leaf.fill = layerColor;
              leaf.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              leaf.noFill();
              leaf.stroke = layerColor;
              leaf.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              leaf.fill = layerColor;
              leaf.stroke = contrastColor;
              leaf.linewidth = 2;
            }

            // Position the shape in the layer
            leaf.rotation = angle;
            leaf.translation.set(
              center.x + innerRadius * Math.cos(angle),
              center.y + innerRadius * Math.sin(angle)
            );
            two.add(leaf);
            break;

          /*case 13: // Leaf Petals (Blueprint Version)
          const leafLength = layerWidth;
          const leafWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.5;
          
          // Create the curved path for the leaf
          const leaf = new Two.Path([
            new Two.Anchor(0, 0),
            new Two.Anchor(leafLength / 2, -leafWidth / 2),
            new Two.Anchor(leafLength, 0),
            new Two.Anchor(leafLength / 2, leafWidth / 2)
          ], true, true); // Closed and curved

          // Apply Blueprint styling
          leaf.noFill();
          leaf.stroke = strokeColor; // Monochrome theme color
          leaf.linewidth = 1.5;

          // Position the shape in the layer
          leaf.rotation = angle;
          leaf.translation.set(
            center.x + innerRadius * Math.cos(angle),
            center.y + innerRadius * Math.sin(angle)
          );
          two.add(leaf);
          break;*/
          case 14: // Superformula (Stylized Version)
            const points = [];
            const numPoints = 120;
            const shapeRadius = Math.min(layerWidth, (Math.PI * 2 * (innerRadius + layerWidth / 2)) / symmetry) * 0.45;

            // The parameters are randomized to create a unique shape
            const { m, n1, n2, n3 } = superformulaParams;
            const a = 1, b = 1;

            for (let k = 0; k < numPoints; k++) {
              const theta = (k / numPoints) * (Math.PI * 2);
              const part1 = Math.cos(m * theta / 4) / a;
              const part2 = Math.sin(m * theta / 4) / b;
              const r_comp = Math.pow(Math.abs(part1), n2) + Math.pow(Math.abs(part2), n3);
              if (r_comp === 0) continue;
              const r = Math.pow(r_comp, -1 / n1);
              points.push(new Two.Anchor(shapeRadius * r * Math.cos(theta), shapeRadius * r * Math.sin(theta)));
            }

            if (points.length > 0) {
              const shape = new Two.Path(points, true);

              // Apply Hybrid Render styling
              if (styleChoice < 0.5) { // Fill Only
                shape.fill = layerColor;
                shape.noStroke();
              } else if (styleChoice < 0.85) { // Stroke Only
                shape.noFill();
                shape.stroke = layerColor;
                shape.linewidth = 1.5;
              } else { // Fill + Contrast Stroke
                shape.fill = layerColor;
                shape.stroke = contrastColor;
                shape.linewidth = 2;
              }

              shape.rotation = angle;
              shape.translation.set(center.x + (innerRadius + layerWidth / 2) * Math.cos(angle), center.y + (innerRadius + layerWidth / 2) * Math.sin(angle));
              two.add(shape);
            }
            break;

          /*case 14: // Superformula (Blueprint Version)
          const points = [];
          const numPoints = 120;
          const shapeRadius = Math.min(layerWidth, (Math.PI * 2 * (innerRadius + layerWidth / 2)) / symmetry) * 0.45;

          // The parameters are still randomized to create a unique outline
          const { m, n1, n2, n3 } = superformulaParams;
          const a = 1, b = 1;

          for (let k = 0; k < numPoints; k++) {
            const theta = (k / numPoints) * (Math.PI * 2);
            const part1 = Math.cos(m * theta / 4) / a;
            const part2 = Math.sin(m * theta / 4) / b;
            const r_comp = Math.pow(Math.abs(part1), n2) + Math.pow(Math.abs(part2), n3);
            if (r_comp === 0) continue;
            const r = Math.pow(r_comp, -1 / n1);
            points.push(new Two.Anchor(shapeRadius * r * Math.cos(theta), shapeRadius * r * Math.sin(theta)));
          }
          if (points.length > 0) {
            const shape = new Two.Path(points, true);

            // Apply Blueprint styling
            shape.noFill();
            shape.stroke = strokeColor;
            shape.linewidth = 1.5;

            shape.rotation = angle;
            shape.translation.set(center.x + (innerRadius + layerWidth / 2) * Math.cos(angle), center.y + (innerRadius + layerWidth / 2) * Math.sin(angle));
            two.add(shape);
          }
          break;*/

          // --- NEW PARAMETRIC SHAPES ---
          case 13: // Parametric Petal (Stylized Version)
            const p_points = [];
            const p_steps = 100;
            // The petal's length and width are still random for variety
            const p_length = layerWidth * (0.8 + prng.nextFloat() * 0.4);
            const p_width = (Math.PI * 2 * innerRadius) / symmetry * (0.4 + prng.nextFloat() * 0.4);

            for (let k = 0; k <= p_steps; k++) {
              const t = (Math.PI / p_steps) * k;
              const x = p_length * Math.sin(t);
              const y = p_width * Math.sin(t) * Math.cos(t);
              p_points.push(new Two.Anchor(x, y));
            }
            const shape = new Two.Path(p_points, false, false);

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              shape.fill = layerColor;
              shape.noStroke();
            } else if (styleChoice < 0.85) { // Stroke Only
              shape.noFill();
              shape.stroke = layerColor;
              shape.linewidth = 1.5;
            } else { // Fill + Contrast Stroke
              shape.fill = layerColor;
              shape.stroke = contrastColor;
              shape.linewidth = 2;
            }

            // Position the shape in the layer
            shape.rotation = angle;
            shape.translation.set(
              center.x + innerRadius * Math.cos(angle),
              center.y + innerRadius * Math.sin(angle)
            );
            two.add(shape);
            break;

          /*case 15: // Parametric Petal (Blueprint Version)
          const p_points = [];
          const p_steps = 100;
          // The petal's length and width are still random for variety
          const p_length = layerWidth * (0.8 + prng.nextFloat() * 0.4);
          const p_width = (Math.PI * 2 * innerRadius) / symmetry * (0.4 + prng.nextFloat() * 0.4);

          for (let k = 0; k <= p_steps; k++) {
            const t = (Math.PI / p_steps) * k;
            const x = p_length * Math.sin(t);
            const y = p_width * Math.sin(t) * Math.cos(t);
            p_points.push(new Two.Anchor(x, y));
          }
          const shape = new Two.Path(p_points, false, false);

          // Apply Blueprint styling
          shape.noFill();
          shape.stroke = strokeColor; // Monochrome theme color
          shape.linewidth = 1.5;
          
          // Position the shape in the layer
          shape.rotation = angle;
          shape.translation.set(
            center.x + innerRadius * Math.cos(angle),
            center.y + innerRadius * Math.sin(angle)
          );
          two.add(shape);
          break;*/

          case 15: // Parametric Leaf (Stylized Version)
            const l_steps_st = 100;
            const l_length_st = layerWidth * (0.9 + prng.nextFloat() * 0.2);
            const l_width_st = (Math.PI * 2 * innerRadius) / symmetry * (0.2 + prng.nextFloat() * 0.3);
            const serration_st = prng.nextFloat() * 0.15;
            const serration_freq_st = prng.nextInt(20, 60);

            const l_points_st = [];
            for (let k = 0; k <= l_steps_st; k++) {
              const t = (Math.PI / l_steps_st) * k;
              const baseWidth = l_width_st * Math.sin(t) * Math.cos(t);
              const jaggedEdge = 1 + serration_st * Math.cos(t * serration_freq_st);
              const x = l_length_st * Math.sin(t);
              const y = baseWidth * jaggedEdge;
              l_points_st.push(new Two.Anchor(x, y));
            }
            const leafPath_st = new Two.Path(l_points_st, false, false);
            const vein_st = new Two.Line(0, 0, l_length_st, 0);
            const shape_st = two.makeGroup(leafPath_st, vein_st);

            // Apply Hybrid Render styling
            if (styleChoice < 0.5) { // Fill Only
              leafPath_st.fill = layerColor;
              leafPath_st.noStroke();
              vein_st.stroke = contrastColor; // Vein gets a contrast stroke to be visible
              vein_st.linewidth = 1;
            } else if (styleChoice < 0.85) { // Stroke Only
              shape_st.noFill();
              shape_st.stroke = layerColor;
              shape_st.linewidth = 1.5;
              vein_st.linewidth = 1;
            } else { // Fill + Contrast Stroke
              leafPath_st.fill = layerColor;
              leafPath_st.stroke = contrastColor;
              leafPath_st.linewidth = 2;
              vein_st.stroke = contrastColor;
              vein_st.linewidth = 1;
            }

            // Position the shape in the layer
            shape_st.rotation = angle;
            shape_st.translation.set(
              center.x + innerRadius * Math.cos(angle),
              center.y + innerRadius * Math.sin(angle)
            );
            break;

          /*case 16: // Parametric Leaf (Blueprint Version)
          const l_steps_bp = 100;
          const l_length_bp = layerWidth * (0.9 + prng.nextFloat() * 0.2);
          const l_width_bp = (Math.PI * 2 * innerRadius) / symmetry * (0.2 + prng.nextFloat() * 0.3);
          const serration_bp = prng.nextFloat() * 0.15;
          const serration_freq_bp = prng.nextInt(20, 60);

          const l_points_bp = [];
          for (let k = 0; k <= l_steps_bp; k++) {
            const t = (Math.PI / l_steps_bp) * k;
            const baseWidth = l_width_bp * Math.sin(t) * Math.cos(t);
            const jaggedEdge = 1 + serration_bp * Math.cos(t * serration_freq_bp);
            const x = l_length_bp * Math.sin(t);
            const y = baseWidth * jaggedEdge;
            l_points_bp.push(new Two.Anchor(x, y));
          }
          const leafPath_bp = new Two.Path(l_points_bp, false, false);
          const vein_bp = new Two.Line(0, 0, l_length_bp, 0);
          const shape_bp = two.makeGroup(leafPath_bp, vein_bp);

          // Apply Blueprint styling to the group
          shape_bp.noFill();
          shape_bp.stroke = strokeColor; // Monochrome theme color
          shape_bp.linewidth = 1.5;
          vein_bp.linewidth = 1; // Make the vein slightly thinner

          // Position the shape in the layer
          shape_bp.rotation = angle;
          shape_bp.translation.set(
            center.x + innerRadius * Math.cos(angle),
            center.y + innerRadius * Math.sin(angle)
          );
          break; */
        }
      }
    }
    two.update();
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    generateMandala();
  });
  button.addEventListener('click', generateMandala);
  generateMandala();
});





