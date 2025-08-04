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
    const minLayers = 7, maxLayers = 12;
    const minSymmetry = 15, maxSymmetry = 80;

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

      const shapeType = prng.nextInt(0, 13);
      const layerColor = selectedPalette.colors[i % selectedPalette.colors.length];
      const styleChoice = prng.nextFloat();

      for (let j = 0; j < symmetry; j++) {
        const angle = (j / symmetry) * (Math.PI * 2);

        switch (shapeType) {
          case 0: // Fine Spikes
            const angleStepSpike = (Math.PI * 2) / symmetry;
            const spikeInnerR = layerRadius * 0.85;
            const tip = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
            const baseLeft = new Two.Vector(center.x + spikeInnerR * Math.cos(angle - angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle - angleStepSpike / 2));
            const baseRight = new Two.Vector(center.x + spikeInnerR * Math.cos(angle + angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle + angleStepSpike / 2));
            const spike = new Two.Path([tip, baseLeft, baseRight], true);
            if (styleChoice < 0.5) { spike.fill = layerColor; spike.noStroke(); }
            else { spike.noFill(); spike.stroke = layerColor; spike.linewidth = 1.5; }
            two.add(spike);
            break;

          case 1: // Arched Gates
            const archInnerR = layerRadius * 0.7;
            const startAngle = angle - (Math.PI / symmetry) * 0.8;
            const endAngle = angle + (Math.PI / symmetry) * 0.8;
            const arch = two.makeArcSegment(center.x, center.y, archInnerR, layerRadius, startAngle, endAngle);
            if (styleChoice < 0.5) { arch.fill = layerColor; arch.noStroke(); }
            else { arch.noFill(); arch.stroke = layerColor; arch.linewidth = 1.5; }
            break;

          case 2: // Woven Ring
            if (j === 0) {
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
              if (styleChoice < 0.5) { wovenPath.fill = layerColor; wovenPath.noStroke(); }
              else { wovenPath.noFill(); wovenPath.stroke = layerColor; wovenPath.linewidth = 1.5; }
              two.add(wovenPath);
            }
            break;

          case 3: // Geometric Lattice
            const angleStepLattice = (Math.PI * 2) / symmetry;
            const x1 = center.x + Math.cos(angle) * innerRadius, y1 = center.y + Math.sin(angle) * innerRadius;
            const x2 = center.x + Math.cos(angle + angleStepLattice) * layerRadius, y2 = center.y + Math.sin(angle + angleStepLattice) * layerRadius;
            two.makeLine(x1, y1, x2, y2).stroke = layerColor;
            const x3 = center.x + Math.cos(angle) * layerRadius, y3 = center.y + Math.sin(angle) * layerRadius;
            const x4 = center.x + Math.cos(angle + angleStepLattice) * innerRadius, y4 = center.y + Math.sin(angle + angleStepLattice) * innerRadius;
            two.makeLine(x3, y3, x4, y4).stroke = layerColor;
            break;

          case 4: // Boundary Ring
            if (j === 0) {
              const inner = two.makeCircle(center.x, center.y, innerRadius);
              inner.noFill(); inner.stroke = layerColor; inner.linewidth = 1.5;
              const outer = two.makeCircle(center.x, center.y, layerRadius);
              outer.noFill(); outer.stroke = layerColor; outer.linewidth = 1.5;
            }
            break;

          // REPLACED WITH GRADIENT RING
          case 5: // Gradient Ring
            if (j === 0) {
              const color1 = selectedPalette.colors[i % selectedPalette.colors.length];
              const color2 = selectedPalette.colors[(i + 1) % selectedPalette.colors.length];
              const gradient = two.makeLinearGradient(
                center.x, center.y - (innerRadius + layerWidth / 2),
                center.x, center.y + (innerRadius + layerWidth / 2),
                new Two.Stop(0, color1),
                new Two.Stop(1, color2)
              );
              const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);
              ring.noFill();
              ring.stroke = gradient;
              ring.linewidth = layerWidth * 0.95;
            }
            break;

          case 6: // Negative Space
            break;

          case 7: // Scalloped Ring
            if (j === 0) {
              const outerVertices = [], innerVertices = [];
              const scallopCount = symmetry * 3, scallopAmplitude = layerWidth * 0.4;
              for (let k = 0; k <= scallopCount; k++) {
                const scallopAngle = (k / scallopCount) * (Math.PI * 2);
                const r_outer = layerRadius - (scallopAmplitude / 2) + scallopAmplitude * Math.sin(scallopAngle * symmetry);
                outerVertices.push(new Two.Vector(center.x + r_outer * Math.cos(scallopAngle), center.y + r_outer * Math.sin(scallopAngle)));
                innerVertices.push(new Two.Vector(center.x + innerRadius * Math.cos(scallopAngle), center.y + innerRadius * Math.sin(scallopAngle)));
              }
              const scallopPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
              if (styleChoice < 0.5) { scallopPath.fill = layerColor; scallopPath.noStroke(); }
              else { scallopPath.noFill(); scallopPath.stroke = layerColor; scallopPath.linewidth = 1.5; }
              two.add(scallopPath);
            }
            break;

          case 8: // Dotted Ring
            const dot = two.makeCircle(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle), 3);
            if (styleChoice < 0.5) { dot.fill = layerColor; dot.noStroke(); }
            else { dot.noFill(); dot.stroke = layerColor; dot.linewidth = 1.5; }
            break;

          case 9: // Triangles
            const triangleInnerR = innerRadius + layerWidth * 0.1;
            const angleStepTriangle = (Math.PI * 2) / symmetry;
            const t1 = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
            const t2 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle - angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle - angleStepTriangle / 2));
            const t3 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle + angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle + angleStepTriangle / 2));
            const triangle = new Two.Path([t1, t2, t3], true);
            if (styleChoice < 0.5) { triangle.fill = layerColor; triangle.noStroke(); }
            else { triangle.noFill(); triangle.stroke = layerColor; triangle.linewidth = 1.5; }
            two.add(triangle);
            break;

          case 10: // Super-ellipse
            const shapeSize = Math.min(layerWidth * 0.8, (Math.PI * 2 * (innerRadius + layerWidth / 2)) / symmetry * 0.8);
            const corner = shapeSize * 0.5 * prng.nextFloat();
            const superellipse = two.makeRoundedRectangle(0, 0, shapeSize, shapeSize, corner);
            if (styleChoice < 0.5) { superellipse.fill = layerColor; superellipse.noStroke(); }
            else { superellipse.noFill(); superellipse.stroke = layerColor; superellipse.linewidth = 1.5; }
            superellipse.rotation = angle;
            superellipse.translation.set(center.x + (innerRadius + layerWidth / 2) * Math.cos(angle), center.y + (innerRadius + layerWidth / 2) * Math.sin(angle));
            break;

          case 11: // Dashed Line Ring
            if (j === 0) {
              const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);
              ring.noFill();
              ring.stroke = layerColor;
              ring.linewidth = 1.5;
              const circumference = Math.PI * 2 * (innerRadius + layerWidth / 2);
              const dashLength = circumference / symmetry / 2;
              ring.dashes = [dashLength, dashLength * (0.5 + prng.nextFloat())];
            }
            break;

          case 12: // Teardrop Petals
            const teardropLength = layerWidth * 0.9;
            const teardropWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.4;
            const teardrop = two.makeEllipse(0, 0, teardropLength / 2, teardropWidth / 2);
            teardrop.vertices[0].x -= teardropLength * 0.25;
            if (styleChoice < 0.5) { teardrop.fill = layerColor; teardrop.noStroke(); }
            else { teardrop.noFill(); teardrop.stroke = layerColor; teardrop.linewidth = 1.5; }
            teardrop.rotation = angle;
            teardrop.translation.set(center.x + (innerRadius + teardropLength / 2) * Math.cos(angle), center.y + (innerRadius + teardropLength / 2) * Math.sin(angle));
            break;

          case 13: // Leaf Petals
            const leafLength = layerWidth;
            const leafWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.5;
            const leaf = new Two.Path([new Two.Anchor(0, 0), new Two.Anchor(leafLength / 2, -leafWidth / 2), new Two.Anchor(leafLength, 0), new Two.Anchor(leafLength / 2, leafWidth / 2)], true, true);
            if (styleChoice < 0.5) { leaf.fill = layerColor; leaf.noStroke(); }
            else { leaf.noFill(); leaf.stroke = layerColor; leaf.linewidth = 1.5; }
            leaf.rotation = angle;
            leaf.translation.set(center.x + innerRadius * Math.cos(angle), center.y + innerRadius * Math.sin(angle));
            two.add(leaf);
            break;
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