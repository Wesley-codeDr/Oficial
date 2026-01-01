#!/usr/bin/env node

/**
 * Script para gerar imagens sociais (OpenGraph e Twitter Cards)
 * usando canvas em Node.js
 */

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const COLORS = {
  primary: '#0ea5e9', // sky-500
  secondary: '#06b6d4', // cyan-500
  dark: '#0a0a0a',
  light: '#ffffff',
  gradient: {
    start: '#0ea5e9',
    end: '#06b6d4'
  }
};

async function createOGImage() {
  console.log('🎨 Criando OpenGraph image (1200x630px)...');

  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, COLORS.gradient.start);
  gradient.addColorStop(1, COLORS.gradient.end);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Logo
  try {
    const logo = await loadImage(path.join(__dirname, '../public/logo-wellwave.png'));
    const logoSize = 200;
    const logoX = 80;
    const logoY = (height - logoSize) / 2;

    // Logo shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  } catch (error) {
    console.warn('⚠️  Logo não encontrado, continuando sem logo');
  }

  // Text content
  const textX = 320;

  // Title
  ctx.fillStyle = COLORS.light;
  ctx.font = 'bold 64px -apple-system, system-ui, sans-serif';
  ctx.fillText('WellWave', textX, 250);

  // Subtitle
  ctx.font = '32px -apple-system, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Sistema de Anamnese Médica', textX, 310);

  // Description
  ctx.font = '24px -apple-system, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('Documentação clínica em 90 segundos', textX, 360);

  // Badge
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.roundRect(textX, 400, 280, 50, 25);
  ctx.fill();

  ctx.fillStyle = COLORS.light;
  ctx.font = 'bold 20px -apple-system, system-ui, sans-serif';
  ctx.fillText('✓ CFM Compliance  ✓ LGPD', textX + 20, 432);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/og-image.png'), buffer);
  console.log('✅ OpenGraph image criada: public/og-image.png');
}

async function createTwitterImage() {
  console.log('🎨 Criando Twitter Card image (1200x600px)...');

  const width = 1200;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background (slightly different for variety)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, COLORS.gradient.start);
  gradient.addColorStop(1, COLORS.gradient.end);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Logo
  try {
    const logo = await loadImage(path.join(__dirname, '../public/logo-wellwave.png'));
    const logoSize = 180;
    const logoX = 80;
    const logoY = (height - logoSize) / 2;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  } catch (error) {
    console.warn('⚠️  Logo não encontrado, continuando sem logo');
  }

  // Text content
  const textX = 300;

  // Title
  ctx.fillStyle = COLORS.light;
  ctx.font = 'bold 60px -apple-system, system-ui, sans-serif';
  ctx.fillText('WellWave', textX, 240);

  // Subtitle
  ctx.font = '28px -apple-system, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Anamnese Inteligente', textX, 290);

  // Stats
  ctx.font = 'bold 24px -apple-system, system-ui, sans-serif';
  ctx.fillStyle = COLORS.light;
  ctx.fillText('⚡ 90s', textX, 360);
  ctx.fillText('🔒 CFM', textX + 150, 360);
  ctx.fillText('✓ LGPD', textX + 300, 360);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/twitter-image.png'), buffer);
  console.log('✅ Twitter Card image criada: public/twitter-image.png');
}

async function main() {
  try {
    await createOGImage();
    await createTwitterImage();
    console.log('🎉 Todas as imagens sociais foram criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar imagens:', error);
    process.exit(1);
  }
}

main();
